import { useEffect, useState } from "react";
import { getBoard,
  createTask,
  updateTask,
  deleteTask,
  moveTask} from "../../services/api.js";
import Logo from "../common/Logo.jsx";
import Button from "../button/Button.jsx";
import TaskColumn from "./TaskColumn.jsx";
import TaskModal from "./TaskModal.jsx";

const PRIORITY_FILTERS = ["All", "Low", "Medium", "High"];

const columnStatus = {
  1: "todo",
  2: "in-progress",
  3: "done",
};

export default function TaskBoard() {
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBoard();

      setBoard(data);

      const loadedTasks = data.columns.flatMap((column) =>
        column.tasks.map((task) => ({
          ...task,
          status: columnStatus[column.id],
          createdAt: task.created_at,
        }))
      );

      setTasks(loadedTasks);
    } catch (err) {
      setError("Unable to load the board. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

const handleSubmit = async (values) => {
  try {
    setError("");

    if (editingTask) {
      const updatedTask = await updateTask(editingTask.id, {
        title: values.title,
        description: values.description,
        priority: values.priority,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...updatedTask,
                createdAt: updatedTask.created_at,
              }
            : task
        )
      );
    } else {
      const newTask = await createTask({
        column_id: 1,
        title: values.title,
        description: values.description,
        priority: values.priority,
      });

      setTasks((prev) => [
        ...prev,
        {
          ...newTask,
          status: "todo",
          createdAt: newTask.created_at,
        },
      ]);
    }

    closeModal();
  } catch (err) {
    setError(err.message || "Failed to save task.");
  }
};

const handleDelete = async (id) => {
  const confirmed = window.confirm("Delete this task?");

  if (!confirmed) return;

  try {
    setError("");

    await deleteTask(id);

    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    setError(err.message || "Failed to delete task.");
  }
};

const handleMove = async (id, status) => {
  const columnMap = {
    todo: 1,
    "in-progress": 2,
    done: 3,
  };

  const columnId = columnMap[status];

  if (!columnId) return;

  try {
    setError("");

    const updatedTask = await moveTask(id, columnId);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask,
              status,
              createdAt: updatedTask.created_at,
            }
          : task
      )
    );
  } catch (err) {
    setError(err.message || "Failed to move task.");
  }
};

  const visibleTasks =
    priorityFilter === "All"
      ? tasks
      : tasks.filter((task) => task.priority === priorityFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-ink-soft">Loading TaskFlow...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger mb-4">{error}</p>

          <Button variant="primary" onClick={loadBoard}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="px-8 py-6 border-b border-border bg-surface">
        <Logo size="md" />

        <p className="text-ink-soft text-[0.95rem] mt-1">
          Simple task management for small teams
        </p>
      </header>

      <main className="max-w-[1100px] mx-auto px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <label
              htmlFor="priority-filter"
              className="text-[0.85rem] font-semibold text-ink"
            >
              Filter Priority
            </label>

            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-[0.85rem] border border-border rounded-lg px-3 py-2 bg-surface text-ink focus:outline-none focus:border-primary"
            >
              {PRIORITY_FILTERS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" onClick={openCreateModal}>
            + Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {board?.columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.name}
              tasks={visibleTasks.filter(
                (task) => task.status === columnStatus[column.id]
              )}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ))}
        </div>
      </main>

      <TaskModal
        open={modalOpen}
        mode={editingTask ? "edit" : "create"}
        initialValues={editingTask || undefined}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}