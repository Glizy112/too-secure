import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, user } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="mb-8">
      <div className="flex items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white/80 tracking-tight hidden sm:block">
            Too Secure
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1 bg-white/4 border border-white/6 rounded-xl p-1">
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              location.pathname === "/dashboard"
                ? "bg-sky-500/15 text-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            Dashboard
          </Link>

          {user?.role === "admin" && (
            <>
              <Link
                to="/users"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  location.pathname === "/users"
                    ? "bg-sky-500/15 text-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                Users
              </Link>
              <Link
                to="/logs"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  location.pathname === "/logs"
                    ? "bg-sky-500/15 text-sky-400 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                Logs
              </Link>
            </>
          )}
        </div>

        {/* Right side: role badge + logout */}
        <div className="flex items-center gap-2 shrink-0">
          {user?.role && (
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              user.role === "admin"
                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${user.role === "admin" ? "bg-amber-400" : "bg-emerald-400"}`} />
              {user.role}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/40
                      border border-white/6 bg-white/3
                      hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5
                      transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
}