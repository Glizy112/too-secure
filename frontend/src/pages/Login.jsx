import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { initializeCsrf } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkSession } = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    (async ()=> {
      await initializeCsrf();
    })();
  },[]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await api.post("/auth/login", { email, password });
      await checkSession();
      await initializeCsrf();
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

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
          {/* Shield icon */}
          <div className="w-10 h-10 mb-6 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-white tracking-tight">
            👋Too Secure
          </h1>
          <p className="mt-1 text-sm text-white/40 font-light">
            Protected by CSRF tokens &amp; role-based access control
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="group">
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

          <div className="group">
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
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full relative overflow-hidden rounded-xl py-3 px-4
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
              Authenticating…
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="mt-6 mb-3 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-xs text-white/20">or</span>
          <div className="flex-1 h-px bg-white/6" />
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-white/30">
          No account yet?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:text-sky-300 transition-colors duration-200 font-medium"
          >
            Create one
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