import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo.jsx";
import Button from "../components/button/Button.jsx";

const TASKS = ["Design review", "Write proposal", "Ship release"];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="px-8 py-6">
        <Logo size="md" />
      </header>

      <main className="flex-1 flex items-center justify-center gap-16 max-w-[1080px] mx-auto px-8 pb-16 pt-8 flex-wrap">
        <div className="max-w-[480px] text-center md:text-left">
          <p className="font-mono text-[0.8rem] tracking-wide uppercase text-primary mb-4">
            Task management, simplified
          </p>
          <h1 className="font-display font-semibold leading-[1.15] text-ink text-[clamp(2.1rem,4.5vw,3rem)] mb-4">
            Organize your work.
            <br />
            Get things done.
          </h1>
          <p className="text-[1.05rem] text-ink-soft leading-relaxed mb-8 max-w-[420px] mx-auto md:mx-0">
            Plan, manage, and track your tasks in one simple workspace.
          </p>
          <div className="flex gap-3.5 flex-wrap justify-center md:justify-start">
            <Button variant="primary" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </div>
        </div>

        <div className="shrink-0" aria-hidden="true">
          <div className="w-[300px] bg-surface border border-border rounded-[22px] shadow-[0_12px_28px_rgba(20,23,31,0.08)] p-6">
            <div className="flex gap-1.5 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
              <span className="w-2.5 h-2.5 rounded-full bg-border" />
            </div>
            <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
              {TASKS.map((task, i) => (
                <li
                  key={task}
                  className="flex items-center gap-3 opacity-0 animate-[task-in_0.4s_ease_forwards]"
                  style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                >
                  <span
                    className="w-5 h-5 rounded-md bg-border flex items-center justify-center shrink-0 animate-[check-fill_0.3s_ease_forwards]"
                    style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6.2L4.8 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className="text-[0.92rem] text-ink-soft animate-[label-strike_0.3s_ease_forwards]"
                    style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                  >
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}