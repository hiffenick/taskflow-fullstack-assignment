import { Link } from "react-router-dom";
import Logo from "../common/Logo.jsx";

export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-8 bg-bg"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="w-full max-w-[400px] bg-surface border border-border rounded-[22px] shadow-[0_12px_28px_rgba(20,23,31,0.08)] px-8 py-9">
        <Link to="/" className="inline-flex mb-7" aria-label="TaskFlow home">
          <Logo size="md" />
        </Link>

        {eyebrow && (
          <p className="font-mono text-xs tracking-wide uppercase text-ink-faint mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-[1.6rem] font-semibold mb-1.5">{title}</h1>
        {subtitle && (
          <p className="text-ink-soft text-[0.92rem] leading-relaxed mb-7">{subtitle}</p>
        )}

        <div className="flex flex-col gap-4">{children}</div>

        {footer && (
          <div className="mt-6 pt-5 border-t border-border text-[0.88rem] text-ink-soft text-center [&_a]:text-primary [&_a]:font-semibold [&_a]:no-underline [&_a:hover]:underline">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}