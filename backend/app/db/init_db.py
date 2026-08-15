import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE = BASE_DIR / "instance" / "taskflow.db"
SCHEMA = BASE_DIR / "app" / "services" / "schema.sql"


def init_db():
    DATABASE.parent.mkdir(parents=True, exist_ok=True)

    db = sqlite3.connect(DATABASE)

    with open(SCHEMA, "r", encoding="utf-8") as file:
        db.executescript(file.read())

    db.commit()
    db.close()

    print("Database initialized successfully.")


if __name__ == "__main__":
    init_db()