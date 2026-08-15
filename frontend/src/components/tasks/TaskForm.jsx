import { useState } from "react";

const PRIORITIES = ["Low", "Medium", "High"];

export default function TaskForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState(
    initialValues || { title: "", description: "", priority: "Medium" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name === "title" && error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required.");
      return;
    }
    onSubmit({ ...values, title: values.title.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="title" className="text-[0.85rem] font-semibold text-ink">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
          placeholder="e.g. Write proposal"
          aria-invalid={!!error}
          aria-describedby={error ? "title-error" : undefined}
          className={`px-3.5 py-2.5 rounded-lg border bg-bg text-ink text-[0.95rem] transition-colors focus:bg-surface focus:outline-none ${
            error ? "border-danger" : "border-border focus:border-primary"
          }`}
        />
        {error && (
          <p id="title-error" className="text-[0.8rem] text-danger m-0">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="description" className="text-[0.85rem] font-semibold text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={3}
          placeholder="Optional details"
          className="px-3.5 py-2.5 rounded-lg border border-border bg-bg text-ink text-[0.95rem] resize-none transition-colors focus:bg-surface focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor="priority" className="text-[0.85rem] font-semibold text-ink">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
          className="px-3.5 py-2.5 rounded-lg border border-border bg-bg text-ink text-[0.95rem] transition-colors focus:bg-surface focus:border-primary focus:outline-none"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="font-semibold text-[0.95rem] rounded-lg px-5 py-3 text-ink-soft hover:text-ink transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="font-semibold text-[0.95rem] rounded-lg px-5 py-3 bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}