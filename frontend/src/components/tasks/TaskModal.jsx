import TaskForm from "./TaskForm.jsx";

export default function TaskModal({ open, mode, initialValues, onSubmit, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-ink/40 flex items-center justify-center px-5 z-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-surface border border-border rounded-[22px] shadow-[0_12px_28px_rgba(20,23,31,0.08)] px-7 py-7"
      >
        <h2 id="task-modal-title" className="font-display text-[1.3rem] font-semibold mb-5">
          {mode === "edit" ? "Edit Task" : "Add Task"}
        </h2>
        <TaskForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel={mode === "edit" ? "Save Changes" : "Create Task"}
        />
      </div>
    </div>
  );
}