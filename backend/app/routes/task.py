from flask import Blueprint, jsonify, request

from app.services.task_service import (
    get_board,
    create_task,
    update_task,
    delete_task,
    move_task,
    get_tasks_by_priority,
    get_task_count_per_column,
)


tasks = Blueprint("tasks", __name__, url_prefix="/api")


@tasks.get("/board")
def board():
    board_data = get_board()

    if not board_data:
        return jsonify({"error": "Board not found"}), 404

    return jsonify(board_data), 200


@tasks.post("/tasks")
def add_task():
    data = request.get_json(silent=True) or {}

    try:
        task = create_task(
            column_id=data.get("column_id"),
            title=data.get("title"),
            description=data.get("description"),
            priority=data.get("priority", "Medium"),
        )

        return jsonify(task), 201

    except ValueError as error:
        return jsonify({"error": str(error)}), 400


@tasks.put("/tasks/<int:task_id>")
def edit_task(task_id):
    data = request.get_json(silent=True) or {}

    try:
        task = update_task(
            task_id=task_id,
            title=data.get("title"),
            description=data.get("description"),
            priority=data.get("priority", "Medium"),
        )

        if not task:
            return jsonify({"error": "Task not found"}), 404

        return jsonify(task), 200

    except ValueError as error:
        return jsonify({"error": str(error)}), 400


@tasks.delete("/tasks/<int:task_id>")
def remove_task(task_id):
    deleted = delete_task(task_id)

    if not deleted:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({"message": "Task deleted successfully"}), 200


@tasks.patch("/tasks/<int:task_id>/move")
def move(task_id):
    data = request.get_json(silent=True) or {}

    column_id = data.get("column_id")

    if not column_id:
        return jsonify({"error": "column_id is required"}), 400

    task = move_task(task_id, column_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify(task), 200


@tasks.get("/tasks")
def filter_tasks():
    priority = request.args.get("priority")

    if not priority:
        return jsonify({"error": "priority is required"}), 400

    if priority not in ("Low", "Medium", "High"):
        return jsonify({"error": "Invalid priority"}), 400

    return jsonify(get_tasks_by_priority(priority)), 200


@tasks.get("/boards/<int:board_id>/task-counts")
def task_counts(board_id):
    return jsonify(get_task_count_per_column(board_id)), 200