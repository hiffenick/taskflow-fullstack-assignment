import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE = BASE_DIR / "instance" / "taskflow.db"


def seed_db():
    db = sqlite3.connect(DATABASE)
    db.execute("PRAGMA foreign_keys = ON")

    # Don't seed again if a board already exists
    existing_board = db.execute(
        "SELECT id FROM boards LIMIT 1"
    ).fetchone()

    if existing_board:
        print("Database already contains seed data.")
        db.close()
        return

    # Board
    cursor = db.execute(
        "INSERT INTO boards (name) VALUES (?)",
        ("TaskFlow Board",)
    )
    board_id = cursor.lastrowid

    # Columns
    columns = {}

    for name, position in [
        ("To Do", 1),
        ("In Progress", 2),
        ("Done", 3),
    ]:
        cursor = db.execute(
            """
            INSERT INTO columns (board_id, name, position)
            VALUES (?, ?, ?)
            """,
            (board_id, name, position)
        )
        columns[name] = cursor.lastrowid

    # Tasks
    tasks = [
        (
            columns["To Do"],
            "Design review",
            "Walk through the board layout with the team.",
            "Medium",
        ),
        (
            columns["In Progress"],
            "Write proposal",
            "Draft the take-home submission notes.",
            "High",
        ),
        (
            columns["Done"],
            "Ship release",
            "Prepare the final TaskFlow submission.",
            "Low",
        ),
    ]

    db.executemany(
        """
        INSERT INTO tasks
            (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
        """,
        tasks
    )

    db.commit()
    db.close()

    print("Seed data inserted successfully.")


if __name__ == "__main__":
    seed_db()