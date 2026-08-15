export default function Logo({ size = "md" }) {
  const dims = size === "lg" ? 40 : 28;

  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={dims} height={dims} viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" className="fill-primary" />
        <path
          d="M8 14.5L12 18.5L20 9.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-mono font-semibold text-[1.05rem] tracking-tight text-ink">
        TaskFlow
      </span>
    </div>
  );
}