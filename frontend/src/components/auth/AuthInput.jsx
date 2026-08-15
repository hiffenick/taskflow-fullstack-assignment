export default function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-[0.85rem] font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`px-3.5 py-2.5 rounded-lg border bg-bg text-ink text-[0.95rem] transition-colors focus:bg-surface focus:outline-none ${
          error ? "border-danger" : "border-border focus:border-primary"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-[0.8rem] text-danger m-0">
          {error}
        </p>
      )}
    </div>
  );
}