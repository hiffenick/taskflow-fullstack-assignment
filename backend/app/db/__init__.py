import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
INSTANCE_DIR = BASE_DIR / "instance"

INSTANCE_DIR.mkdir(parents=True, exist_ok=True)

DATABASE = INSTANCE_DIR / "taskflow.db"


def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys = ON")
    return db