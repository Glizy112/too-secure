import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => {
      setLogs(res.data);
    });
  }, []);

  return (
    <Layout>
 
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">Security Logs</h1>
          <p className="text-sm text-white/30 mt-0.5 text-start pl-2">
            {logs?.length ?? 0} recorded {logs?.length === 1 ? "event" : "events"}
          </p>
        </div>
    
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "LOGIN",           cls: "bg-sky-500/10 text-sky-400 border-sky-500/20"     },
            { label: "LOGOUT",          cls: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
            { label: "CREATE_USER",     cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
            { label: "DELETE_USER",     cls: "bg-red-500/10 text-red-400 border-red-500/20"     },
            { label: "SESSION_EXPIRED", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
          ].map(({ label, cls }) => (
            <span key={label} className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest border ${cls}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
    
      {/* Log list */}
      <div className="bg-[#13161d] border border-white/6 rounded-2xl overflow-hidden
                      transition-shadow duration-300
                      hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.06)]">
    
        {(logs ?? []).length === 0 && (
          <div className="p-10 text-center">
            <p className="text-sm text-white/25">No log events recorded yet.</p>
          </div>
        )}
    
        {(logs ?? []).map((log, i) => {
    
          /* capsule config per event type */
          const eventConfig = {
            LOGIN: {
              cls: "bg-sky-500/10 text-sky-400 border-sky-500/20",
              dot: "bg-sky-400",
              glow: "shadow-[0_0_8px_rgba(56,189,248,0.4)]",
            },
            LOGOUT: {
              cls: "bg-slate-500/10 text-slate-400 border-slate-500/20",
              dot: "bg-slate-400",
              glow: "",
            },
            CREATE_USER: {
              cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
              dot: "bg-emerald-400",
              glow: "shadow-[0_0_8px_rgba(52,211,153,0.4)]",
            },
            DELETE_USER: {
              cls: "bg-red-500/10 text-red-400 border-red-500/20",
              dot: "bg-red-400",
              glow: "shadow-[0_0_8px_rgba(248,113,113,0.4)]",
            },
            SESSION_EXPIRED: {
              cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              dot: "bg-amber-400",
              glow: "shadow-[0_0_8px_rgba(251,191,36,0.4)]",
            },
          };
          const cfg = eventConfig[log.action] ?? {
            cls: "bg-white/5 text-white/40 border-white/10",
            dot: "bg-white/30",
            glow: "",
          };
    
          const statusBadge = {
            success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            failure: "text-red-400 bg-red-500/10 border-red-500/20",
            info:    "text-sky-400 bg-sky-500/10 border-sky-500/20",
          }[log.status?.toLowerCase()] ?? "text-white/30 bg-white/5 border-white/10";
    
          return (
            <div
              key={log.id}
              className={`group flex items-center gap-3 sm:gap-5 px-4 sm:px-5 py-3.5
                          transition-all duration-200
                          hover:bg-white/2.5
                          ${i !== 0 ? "border-t border-white/5" : ""}`}
            >
              {/* Animated dot + event capsule */}
              <div className="flex items-center gap-2.5 shrink-0 min-w-35 sm:min-w-45">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${cfg.dot} ${cfg.glow}`} />
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest border transition-shadow duration-300 group-hover:${cfg.glow} ${cfg.cls}`}>
                  {log.action}
                </span>
              </div>
    
              {/* Status */}
              <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${statusBadge}`}>
                {log.status}
              </span>
    
              {/* Spacer */}
              <div className="flex-1" />
    
              {/* Timestamp */}
              <span className="text-xs text-white/20 tabular-nums shrink-0">
                {new Date(log.timestamp + "Z").toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
      </div>
    
    </Layout>
  );
}