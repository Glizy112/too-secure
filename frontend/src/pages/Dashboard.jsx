import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import api, { initializeCsrf } from "../api/axios";
import sampleUserData from "../data/sampleUserData.json";

export default function Dashboard() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  
  useEffect(()=> {
    (async ()=> {
      await initializeCsrf();
    })();
  },[]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
    api.get("/admin/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white tracking-tight">
          {user?.role === "admin" ? "Admin Overview" : "My Account"}
        </h1>
        <p className="text-sm text-white/30 mt-0.5">
          Welcome back —{" "}
          <span className={user?.role === "admin" ? "text-amber-400" : "text-emerald-400"}>
            {user?.email}
          </span>
        </p>
      </div>

      {user?.role === "admin" ? (
      <div className="space-y-4">
  
        {/* Stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Registered Users",
              value: users?.length ?? "—",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
              color: "sky",
            },
            {
              label: "Total Log Events",
              value: logs?.length ?? "—",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              ),
              color: "violet",
            },
            {
              label: "Active Sessions",
              value: "1",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              color: "emerald",
            },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              className={`bg-[#13161d] border border-white/6 rounded-xl p-4
                          transition-shadow duration-300
                          hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.08)]`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-3
                ${color === "sky"     ? "bg-sky-500/10 text-sky-400"
                : color === "violet"  ? "bg-violet-500/10 text-violet-400"
                : "bg-emerald-500/10 text-emerald-400"}`}
              >
                {icon}
              </div>
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-xs text-white/30 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
  
        {/* Two action cards: Manage Users + Recent Logs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  
          {/* Manage Users card */}
          <Link
            to="/users"
            className="group block bg-[#13161d] border border-white/6 rounded-2xl p-5
                      transition-all duration-300 cursor-pointer
                      hover:border-sky-500/20
                      hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(56,189,248,0.1),0_0_60px_rgba(56,189,248,0.04)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-white/20 group-hover:text-sky-400/60 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
  
            <p className="text-3xl font-semibold text-white mb-1">{users?.length ?? "—"}</p>
            <p className="text-sm font-medium text-white/60">Manage Users</p>
            <p className="text-xs text-white/25 mt-1">Create, view and delete registered accounts</p>
          </Link>
  
          {/* Recent Logs card */}
          <div
            className="bg-[#13161d] border border-white/6 rounded-2xl p-5
                      transition-all duration-300
                      hover:border-sky-500/20
                      hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(56,189,248,0.1),0_0_60px_rgba(56,189,248,0.04)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              </div>
              <Link
                to="/logs"
                className="text-xs text-white/25 hover:text-sky-400 transition-colors duration-200"
              >
                View all →
              </Link>
            </div>
  
            <div className="space-y-2.5">
              {(logs ?? []).slice(0, 4).map((log) => {
                const capsuleStyles = {
                  LOGIN:           "bg-sky-500/10 text-sky-400 border-sky-500/20",
                  LOGOUT:          "bg-slate-500/10 text-slate-400 border-slate-500/20",
                  CREATE_USER:     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                  DELETE_USER:     "bg-red-500/10 text-red-400 border-red-500/20",
                  SESSION_EXPIRED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                };
                const style = capsuleStyles[log.action] ?? "bg-white/5 text-white/40 border-white/10";
                return (
                  <div key={log.id} className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest border ${style}`}>
                      {log.action}
                    </span>
                    <span className="text-xs text-white/20 font-light tabular-nums shrink-0">
                      {new Date(log.timestamp + "Z").toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                );
              })}
              {(!logs || logs.length === 0) && (
                <p className="text-xs text-white/20">No recent events.</p>
              )}
            </div>
          </div>
  
        </div>
      </div>
  
    ) : (
  
      /*User View */
      <div className="space-y-4">
  
        {/* Status banner */}
        <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl px-5 py-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-emerald-400">Account Active &amp; Authenticated</p>
            <p className="text-xs text-white/30 text-start">Your session is protected and valid</p>
          </div>
        </div>
  
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Last Login",
              value: new Date(sampleUserData.lastLogin).toLocaleDateString([], { month: "short", day: "numeric" }),
              sub: new Date(sampleUserData.lastLogin).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              ),
              color: "sky",
            },
            {
              label: "Active Sessions",
              value: `${sampleUserData.activeSessions} / ${sampleUserData.maxSessions}`,
              sub: "sessions open",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              color: "emerald",
            },
            {
              label: "Password Age",
              value: `${Math.floor((Date.now() - new Date(sampleUserData.passwordLastChanged)) / 86400000)}d`,
              sub: "since last change",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              ),
              color: "amber",
            },
          ].map(({ label, value, sub, icon, color }) => (
            <div
              key={label}
              className="bg-[#13161d] border border-white/6 rounded-xl p-4
                        transition-shadow duration-300
                        hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.08)]"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-3
                ${color === "sky" ? "bg-sky-500/10 text-sky-400"
                : color === "emerald" ? "bg-emerald-500/10 text-emerald-400"
                : "bg-amber-500/10 text-amber-400"}`}
              >
                {icon}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold text-white">{value}</p>
                <p className="text-xs text-white/25 mt-0.5">{sub}</p>
                <p className="text-xs text-white/40 mt-1 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Last login details + Recent activity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  
          {/* Last login details */}
          <div className="bg-[#13161d] border border-white/6 rounded-2xl p-5
                          transition-shadow duration-300
                          hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.08)]">
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Last Login Details</p>
            <div className="space-y-3">
              {[
                { label: "Location", value: sampleUserData.lastLoginLocation },
                { label: "Device", value: sampleUserData.lastLoginDevice   },
                { label: "Member since", value: new Date(sampleUserData.accountCreated).toLocaleDateString([], { year: "numeric", month: "long", day: "numeric" }) },
                { label: "2FA", value: sampleUserData.twoFactorEnabled ? "Enabled" : "Not enabled",
                  badge: sampleUserData.twoFactorEnabled
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                },
              ].map(({ label, value, badge }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-white/30">{label}</span>
                  {badge ? (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>{value}</span>
                  ) : (
                    <span className="text-xs text-white/60 font-medium">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          {/* Recent activity */}
          <div className="bg-[#13161d] border border-white/6 rounded-2xl p-5
                          transition-shadow duration-300
                          hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.08)]">
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Recent Activity</p>
            <div className="space-y-3">
              {sampleUserData.recentActivity.map((item, i) => {
                const capsuleStyles = {
                  LOGIN: "bg-sky-500/10 text-sky-400 border-sky-500/20",
                  SESSION_EXPIRED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                  LOGOUT: "bg-slate-500/10 text-slate-400 border-slate-500/20",
                };
                const style = capsuleStyles[item.event] ?? "bg-white/5 text-white/40 border-white/10";
                return (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest border ${style}`}>
                      {item.event}
                    </span>
                    <span className="text-xs text-white/20 tabular-nums shrink-0">
                      {new Date(item.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                      {" · "}
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
  
        </div>
      </div>
    )}
    </Layout>
  );
}