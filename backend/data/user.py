from model.user import UserDatabaseModel, UserRequestModel
from data.init import (conn, curs, IntegrityError)
from errors import Missing, Duplicate
import sqlite3

curs.execute("""
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT 0,
        is_verified BOOLEAN NOT NULL DEFAULT 0,
        verified_at TIMESTAMP,
        registered_at TIMESTAMP,
        updated_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL
    )
    """)

# for deleted/blocked users
curs.execute("""
    CREATE TABLE IF NOT EXISTS xuser (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT 0,
        is_verified BOOLEAN NOT NULL DEFAULT 0,
        verified_at TIMESTAMP,
        registered_at TIMESTAMP,
        updated_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL
    )
    """)


def table_exists(table_name):
    qry = "SELECT name FROM sqlite_master WHERE type='table' AND name=:table_name"
    curs.execute(qry, {"table_name": table_name})
    return curs.fetchone() is not None


def list_tables(conn):
    qry = "SELECT name FROM sqlite_master WHERE type='table'"
    curs = conn.cursor()
    curs.execute(qry)
    tables = [row[0] for row in curs.fetchall()]
    return tables


def row_to_model(row: tuple) -> UserDatabaseModel:
    return UserDatabaseModel(
        id=row[0],
        first_name=row[1],
        last_name=row[2],
        email=row[3],
        password=row[4],
        is_active=row[5],
        is_verified=row[6],
        verified_at=row[7],
        registered_at=row[8],
        updated_at=row[9],
        created_at=row[10]
    )


def model_to_dict(user: UserDatabaseModel):
    return user.model_dump()


def get_one(email: str):
    """ Get one user by its name."""
    qry = "select  * from user where email = :email"
    params: dict[str, str] = {"email": email}
    curs.execute(qry, params)
    row = curs.fetchone()
    if row:
        return row_to_model(row)
    else:
        raise Missing(msg=f"E-mail {email} not found")


def get_all():
    """Returns all users in the database as a list of User objects."""
    qry = "select  * from user"
    curs.execute(qry)
    return [row_to_model(row) for row in curs.fetchall()]


# Function to check if the email is already registered
def is_email_registered(email: str, table: str) -> bool:
    curs.execute(f"SELECT 1 FROM {table} WHERE email = ?", (email,))
    return curs.fetchone() is not None


def create(user: UserDatabaseModel, table="user"):
    """Creates a new user on the specified table (default is 'user')."""
    # tables = list_tables(conn)
    # print("Tables in the database:", tables)
    if not table_exists(table):
        raise ValueError(f"Table {table} does not exist")
    if is_email_registered(user.email, table):
        raise Duplicate(f"User with email {user.email} already exists.")
    if table not in ["user", "xuser"]:
        raise ValueError('Invalid table')

    qry = f"""INSERT INTO {table} (first_name, last_name, email, password, is_active, is_verified, verified_at, registered_at, updated_at, created_at) VALUES (:first_name, :last_name, :email, :password, :is_active, :is_verified, :verified_at, :registered_at, :updated_at, :created_at)"""
    params = model_to_dict(user)
    try:
        curs.execute(qry, params)
        conn.commit()
        return {"message": "User account created. Redirecting to login page"}
    except IntegrityError as e:
        conn.rollback()
        raise Duplicate(msg=f"{table} : User {user.first_name} {
                        user.last_name} already exists.")


# def modify(user: UserDatabaseModel):
#     qry = """update user set name = :name, hash = :hash where name = :name0"""

#     params = model_to_dict(user)
#     params["name0"] = user.name
#     curs.execute(qry, params)
#     conn.commit()
#     if curs.rowcount == 1:
#         return get_one(user.name)
#     else:
#         raise Missing(msg=f"User {user.name} not found")


def delete(name: str):
    """Drop user with <name> from user table, add to xuser table"""
    user = get_one(name)
    qry = "delete from user where name = :name"
    params = {"name": name}

    res = curs.execute(qry, params)
    conn.commit()
    if curs.rowcount != 1:
        raise Missing(msg=f"User {name} not found")
    create(user=user, table="xuser")
    return True
