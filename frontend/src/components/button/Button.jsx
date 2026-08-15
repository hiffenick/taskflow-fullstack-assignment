const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary:
    "bg-surface text-ink border border-border hover:border-primary hover:text-primary",
  ghost: "bg-transparent text-ink-soft px-3 py-2 hover:text-primary",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  fullWidth = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold text-[0.95rem] rounded-lg border border-transparent px-5 py-3 transition-colors active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : ""
      } ${VARIANTS[variant]}`}
    >
      {children}
    </button>
  );
}