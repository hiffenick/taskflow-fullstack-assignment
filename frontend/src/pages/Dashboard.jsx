import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo.jsx";
import Button from "../components/button/Button.jsx";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-surface">
        <Logo size="md" />
        <Button variant="ghost" onClick={() => navigate("/")}>
          Log Out
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center bg-surface border border-border rounded-[22px] shadow-sm px-10 py-12 max-w-[420px]">
          <h1 className="font-display text-2xl font-semibold mb-2.5">
            Welcome to your workspace 👋
          </h1>
          <p className="text-ink-soft m-0">This is your TaskFlow dashboard.</p>
        </div>
      </main>
    </div>
  );
}