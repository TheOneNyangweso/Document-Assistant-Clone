from sqlite3 import connect, IntegrityError
import os

_dbname = os.environ.get("DOCUMENT_SQLITE_DB", "doc.db")
conn = connect(database=_dbname, check_same_thread=False)
curs = conn.cursor()
