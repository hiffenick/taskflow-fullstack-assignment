import { useState } from "react";
import Logo from "../common/Logo.jsx";
import Button from "../button/Button.jsx";
import TaskColumn from "./TaskColumn.jsx";
import TaskModal from "./TaskModal.jsx";

const COLUMNS = [
  { status: "todo", title: "To Do" },
  { status: "in-progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

const PRIORITY_FILTERS = ["All", "Low", "Medium", "High"];

const SEED_TASKS = [
  {
    id: crypto.randomUUID(),
    title: "Design review",
    description: "Walk through the board layout with the team.",
    priority: "Medium",
    status: "todo",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Write proposal",
    description: "Draft the take-home submission notes.",
    priority: "High",
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Ship release",
    description: "",
    priority: "Low",
    status: "done",
    createdAt: new Date().toISOString(),
  },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleSubmit = (values) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? { ...t, title: values.title, description: values.description, priority: values.priority }
            : t
        )
      );
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: values.title,
          description: values.description,
          priority: values.priority,
          status: "todo",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMove = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const visibleTasks =
    priorityFilter === "All" ? tasks : tasks.filter((t) => t.priority === priorityFilter);

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
            <label htmlFor="priority-filter" className="text-[0.85rem] font-semibold text-ink">
              Filter Priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-[0.85rem] border border-border rounded-lg px-3 py-2 bg-surface text-ink focus:outline-none focus:border-primary"
            >
              {PRIORITY_FILTERS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <Button variant="primary" onClick={openCreateModal}>
            + Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLUMNS.map((col) => (
            <TaskColumn
              key={col.status}
              title={col.title}
              tasks={visibleTasks.filter((t) => t.status === col.status)}
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