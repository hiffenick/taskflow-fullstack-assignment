import sqlite3

import pytest

from app.services import task_service


@pytest.fixture
def test_db(tmp_path, monkeypatch):
    database = tmp_path / "test.db"

    db = sqlite3.connect(database)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys = ON")

    with open("app/services/schema.sql", "r", encoding="utf-8") as file:
        db.executescript(file.read())

    # Seed test board
    db.execute(
        "INSERT INTO boards (name) VALUES (?)",
        ("Test Board",)
    )

    board_id = db.execute(
        "SELECT id FROM boards"
    ).fetchone()["id"]

    # Seed columns
    db.execute(
        """
        INSERT INTO columns (board_id, name, position)
        VALUES (?, ?, ?)
        """,
        (board_id, "To Do", 1)
    )

    db.execute(
        """
        INSERT INTO columns (board_id, name, position)
        VALUES (?, ?, ?)
        """,
        (board_id, "In Progress", 2)
    )

    # Seed task
    db.execute(
        """
        INSERT INTO tasks
        (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
        """,
        (1, "Test Task", "Testing", "High")
    )

    db.commit()
    db.close()

    def get_test_db():
        connection = sqlite3.connect(database)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        return connection

    monkeypatch.setattr(
        task_service,
        "get_db",
        get_test_db
    )

    yield database