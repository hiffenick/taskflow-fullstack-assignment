import { useState } from "react";

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  required = false,
  error,
  autoComplete = "current-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-ink">
        {label}
      </label>
      <div className="relative flex">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`flex-1 pr-14 px-3.5 py-2.5 rounded-lg border bg-bg text-ink text-[0.95rem] transition-colors focus:bg-surface focus:outline-none ${
            error ? "border-danger" : "border-border focus:border-primary"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[0.78rem] font-semibold text-ink-soft hover:text-primary px-1"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-[0.8rem] text-danger m-0">
          {error}
        </p>
      )}
    </div>
  );
}