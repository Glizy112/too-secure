import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  /* Simple password strength indicator */
  const getStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-amber-400",
    "bg-yellow-300",
    "bg-emerald-400",
  ][strength];

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center px-4 py-12">

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      {/* Card */}
      <div
        className="relative w-full max-w-md bg-[#13161d] border border-white/6 rounded-2xl p-8 sm:p-10
                   shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_rgba(0,0,0,0.5)]
                   transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_32px_64px_rgba(0,0,0,0.6),0_0_80px_rgba(56,189,248,0.04)]"
      >
        {/* Header */}
        <div className="mb-8">
          {/* Key icon */}
          <div className="w-10 h-10 mb-6 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-white tracking-tight">
            Create Account
          </h1>
          <p className="mt-1 text-sm text-white/40 font-light">
            Join the secure portal — protected start-to-end
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3
                         text-sm text-white placeholder-white/20 outline-none
                         transition-all duration-300
                         focus:border-sky-500/50 focus:bg-white/6 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]
                         hover:border-white/[0.14]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3
                         text-sm text-white placeholder-white/20 outline-none
                         transition-all duration-300
                         focus:border-sky-500/50 focus:bg-white/6 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]
                         hover:border-white/[0.14]"
            />

            {/* Password strength meter */}
            {password.length > 0 && (
              <div className="mt-3">
                <div className="flex gap-1 mb-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength ? strengthColor : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/30">
                  Strength:{" "}
                  <span
                    className={`font-medium ${
                      strength === 4
                        ? "text-emerald-400"
                        : strength === 3
                        ? "text-yellow-300"
                        : strength === 2
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {strengthLabel}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Terms note */}
        <p className="mt-5 text-xs text-white/20 leading-relaxed">
          By registering, you agree that your session will be protected via CSRF tokens and access will be governed by role-based controls.
        </p>

        {/* CTA */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="mt-5 w-full relative overflow-hidden rounded-xl py-3 px-4
                     bg-sky-500 text-white text-sm font-medium tracking-wide
                     transition-all duration-300
                     hover:bg-sky-400 hover:shadow-[0_8px_24px_rgba(56,189,248,0.25)]
                     active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating account…
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-xs text-white/20">or</span>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-white/30">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-sky-400 hover:text-sky-300 transition-colors duration-200 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Bottom badge */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/6 text-white/25 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Secure connection established
        </div>
      </div>
    </div>
  );
}