"""
Since a lot should be done in this layer...I'll just list them down here:
1. Check if user is active/inactive
2. Check if user is verified else send/resend verification email
"""

from datetime import timedelta
import datetime
import json
# jose is for encryption / decryption of jwt token
from jose import JWTError, jwt
from model.user import UserDatabaseModel, UserRequestModel
from data import user as data

# ---new auth stuff
# passlib is to hash(with a salt) the password
from passlib.context import CryptContext

# to increase security here...(to add sso)
with open('/home/nyangweso/Desktop/Projects/Document-Assistant/backend/config.json', 'r') as f:
    CONFIG = json.load(f)
    SECRET_KEY = CONFIG['SECRET_KEY']
    # CLIENT_KEY = CONFIG['CLIENT_KEY']
    # CLIENT_SECRET = CONFIG['CLIENT_SECRET']

ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain: str, hash: str):
    """Hash <plain> and compare with <hash> from the database"""
    return pwd_context.verify(plain, hash)


def get_hash(plain: str):
    return pwd_context.hash(plain)


# get_current_jwt_username(), lookup_user() and get_current_user() are for getting current user
def get_current_jwt_username(token: str):
    """Return username from JWT access <token>"""
    try:
        payload = jwt.decode(token=token,  key=SECRET_KEY,
                             algorithms=[ALGORITHM])
        if not (username := payload.get("sub")):
            return None
    except JWTError:
        return None
    return username


def lookup_user(email: str):
    """Return a matching User fron the database for <name>"""
    if (user := data.get_one(email=email)):
        return user
    return None


def get_current_user(token: str):
    """Decode an OAuth access <token> and return the User"""
    if not (email := get_current_jwt_username(token)):
        return None
    if (user := lookup_user(email=email)):
        return user
    return None


def auth_user(email: str, plain: str):
    if not (user := lookup_user(email=email)):
        return None
    if not verify_password(plain, user.password):
        return None
    return user


def create_access_token(data: dict, expires: timedelta | None = None):
    """Return a JWT access token"""
    src = data.copy()
    now = datetime.datetime.now(datetime.UTC)
    if not expires:
        expires = timedelta(minutes=15)
    src["exp"] = now + expires

    token = jwt.encode(src, key=SECRET_KEY, algorithm=ALGORITHM)
    return token


# ---CRUD operations still passthrough stuff

def get_all():
    return data.get_all()


def get_one(name: str):
    return data.get_one(name)


def create(user: UserRequestModel):
    user.password = get_hash(user.password)
    current_time = datetime.datetime.now(datetime.UTC)

    user_db = UserDatabaseModel(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password,
        created_at=current_time,
        registered_at=current_time
    )
    return data.create(user_db)


# def modify(user: UserRequestModels):
#     return data.modify(user)


# def delete(name: UserRequestModels):
#     return data.delete(name)
