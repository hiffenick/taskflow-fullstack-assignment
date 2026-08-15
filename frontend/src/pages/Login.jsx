import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthInput from "../components/auth/AuthInput.jsx";
import PasswordInput from "../components/auth/PasswordInput.jsx";
import Button from "../components/button/Button.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!form.password) nextErrors.password = "Password is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Phase 1: no real auth yet.
    navigate("/dashboard");
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Welcome back 👋"
      subtitle="Log in to continue managing your tasks."
      footer={
        <>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          autoComplete="email"
          error={errors.email}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          required
          error={errors.password}
        />

        <div className="flex justify-end -mt-1.5 mb-0.5">
          <button
            type="button"
            className="bg-transparent border-none p-0 text-[0.82rem] text-ink-soft hover:text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" variant="primary" fullWidth>
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
}