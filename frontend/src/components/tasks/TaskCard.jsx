const PRIORITY_STYLES = {
  Low: "bg-accent-soft text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-red-50 text-danger border-red-200",
};

const STATUS_OPTIONS = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-[0.98rem] font-semibold text-ink leading-snug">
          {task.title}
        </h3>
        <span
          className={`shrink-0 text-[0.72rem] font-semibold px-2 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-[0.85rem] text-ink-soft leading-relaxed">{task.description}</p>
      )}

      <p className="text-[0.75rem] text-ink-faint font-mono">Created {formattedDate}</p>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          aria-label={`Move "${task.title}" to a different column`}
          className="text-[0.8rem] border border-border rounded-md px-2 py-1 bg-bg text-ink focus:outline-none focus:border-primary"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="text-[0.8rem] font-semibold text-ink-soft hover:text-primary px-2 py-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-[0.8rem] font-semibold text-ink-soft hover:text-danger px-2 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}