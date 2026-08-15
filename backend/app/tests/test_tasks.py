import pytest

from app.services.task_service import (
    create_task,
    move_task,
    get_task_count_per_column,
)


def test_create_task_without_title_fails(test_db):
    with pytest.raises(ValueError, match="Task title is required."):
        create_task(
            column_id=1,
            title="",
            description="Test task",
            priority="Medium",
        )


def test_move_task(test_db):
    task = move_task(1, 2)

    assert task is not None
    assert task["column_id"] == 2


def test_task_count_per_column(test_db):
    result = get_task_count_per_column(1)

    assert result == [
        {
            "id": 1,
            "name": "To Do",
            "task_count": 1,
        },
        {
            "id": 2,
            "name": "In Progress",
            "task_count": 0,
        },
    ]