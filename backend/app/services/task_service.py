from app.db import get_db


def get_board():
    db = get_db()

    board = db.execute(
        """
        SELECT id, name, created_at
        FROM boards
        ORDER BY id
        LIMIT 1
        """
    ).fetchone()

    if not board:
        db.close()
        return None

    columns = db.execute(
        """
        SELECT id, board_id, name, position
        FROM columns
        WHERE board_id = ?
        ORDER BY position
        """,
        (board["id"],)
    ).fetchall()

    result = {
        "id": board["id"],
        "name": board["name"],
        "created_at": board["created_at"],
        "columns": []
    }

    for column in columns:
        tasks = db.execute(
            """
            SELECT
                id,
                column_id,
                title,
                description,
                priority,
                created_at
            FROM tasks
            WHERE column_id = ?
            ORDER BY created_at DESC
            """,
            (column["id"],)
        ).fetchall()

        result["columns"].append({
            "id": column["id"],
            "name": column["name"],
            "position": column["position"],
            "tasks": [dict(task) for task in tasks]
        })

    db.close()

    return result


def create_task(column_id, title, description=None, priority="Medium"):
    if not column_id:
        raise ValueError("Column is required.")
    
    if not title or not title.strip():
        raise ValueError("Task title is required.")

    if priority not in ("Low", "Medium", "High"):
        raise ValueError("Invalid priority.")

    db = get_db()

    cursor = db.execute(
        """
        INSERT INTO tasks
            (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
        """,
        (column_id, title.strip(), description, priority)
    )

    db.commit()

    task = db.execute(
        """
        SELECT id, column_id, title, description, priority, created_at
        FROM tasks
        WHERE id = ?
        """,
        (cursor.lastrowid,)
    ).fetchone()

    db.close()

    return dict(task)


def update_task(task_id, title, description=None, priority="Medium"):
    if not title or not title.strip():
        raise ValueError("Task title is required.")

    if priority not in ("Low", "Medium", "High"):
        raise ValueError("Invalid priority.")

    db = get_db()

    cursor = db.execute(
        """
        UPDATE tasks
        SET title = ?, description = ?, priority = ?
        WHERE id = ?
        """,
        (title.strip(), description, priority, task_id)
    )

    if cursor.rowcount == 0:
        db.close()
        return None

    db.commit()

    task = db.execute(
        """
        SELECT id, column_id, title, description, priority, created_at
        FROM tasks
        WHERE id = ?
        """,
        (task_id,)
    ).fetchone()

    db.close()

    return dict(task)


def delete_task(task_id):
    db = get_db()

    cursor = db.execute(
        """
        DELETE FROM tasks
        WHERE id = ?
        """,
        (task_id,)
    )

    db.commit()
    db.close()

    return cursor.rowcount > 0


def move_task(task_id, column_id):
    db = get_db()

    cursor = db.execute(
        """
        UPDATE tasks
        SET column_id = ?
        WHERE id = ?
        """,
        (column_id, task_id)
    )

    if cursor.rowcount == 0:
        db.close()
        return None

    db.commit()

    task = db.execute(
        """
        SELECT id, column_id, title, description, priority, created_at
        FROM tasks
        WHERE id = ?
        """,
        (task_id,)
    ).fetchone()

    db.close()

    return dict(task)


def get_tasks_by_priority(priority):
    db = get_db()

    tasks = db.execute(
        """
        SELECT id, column_id, title, description, priority, created_at
        FROM tasks
        WHERE priority = ?
        ORDER BY created_at DESC
        """,
        (priority,)
    ).fetchall()

    db.close()

    return [dict(task) for task in tasks]


def get_task_count_per_column(board_id):
    db = get_db()

    rows = db.execute(
        """
        SELECT
            columns.id,
            columns.name,
            COUNT(tasks.id) AS task_count
        FROM columns
        LEFT JOIN tasks
            ON tasks.column_id = columns.id
        WHERE columns.board_id = ?
        GROUP BY columns.id, columns.name
        ORDER BY columns.position
        """,
        (board_id,)
    ).fetchall()

    db.close()

    return [dict(row) for row in rows]