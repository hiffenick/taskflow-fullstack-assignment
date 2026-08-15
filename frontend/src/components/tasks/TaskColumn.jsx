import TaskCard from "./TaskCard.jsx";

export default function TaskColumn({ title, tasks, onEdit, onDelete, onMove }) {
  return (
    <div className="bg-bg border border-border rounded-2xl p-4 flex flex-col gap-3 min-h-[200px]">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display text-[0.95rem] font-semibold text-ink">{title}</h2>
        <span className="text-[0.75rem] font-mono text-ink-faint">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-[0.82rem] text-ink-faint text-center py-6">No tasks here.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </div>
  );
}