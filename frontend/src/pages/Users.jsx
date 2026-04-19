import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    await api.post("/admin/users", {
      email,
      password,
      role: "user",
    });

    setEmail("");
    setPassword("");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <Layout>
 
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white tracking-tight">User Management</h1>
        <p className="text-sm text-white/30 mt-0.5">
          {users?.length ?? 0} registered {users?.length === 1 ? "account" : "accounts"}
        </p>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    
        {/* Create User form (left panel) */}
        <div className="sm:col-span-1">
          <div className="bg-[#13161d] border border-white/6 rounded-2xl p-5
                          transition-shadow duration-300
                          hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(56,189,248,0.08)]">
    
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-white/70">New User</p>
            </div>
    
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-medium text-white/35 uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5
                            text-sm text-white placeholder-white/20 outline-none
                            transition-all duration-200
                            focus:border-sky-500/50 focus:bg-white/6 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]
                            hover:border-white/[0.14]"
                />
              </div>
    
              <div>
                <label className="block text-[10px] font-medium text-white/35 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5
                            text-sm text-white placeholder-white/20 outline-none
                            transition-all duration-200
                            focus:border-sky-500/50 focus:bg-white/6 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]
                            hover:border-white/[0.14]"
                />
              </div>
    
              <button
                onClick={handleCreate}
                className="w-full mt-1 rounded-xl py-2.5 px-4
                          bg-sky-500 text-white text-sm font-medium tracking-wide
                          transition-all duration-300
                          hover:bg-sky-400 hover:shadow-[0_8px_20px_rgba(56,189,248,0.25)]
                          active:scale-[0.98]"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
    
        {/* User list (right panel) */}
        <div className="sm:col-span-2">
          <div className="space-y-2.5">
            {(users ?? []).length === 0 && (
              <div className="bg-[#13161d] border border-white/6 rounded-2xl p-8 text-center">
                <p className="text-sm text-white/25">No users registered yet.</p>
              </div>
            )}
    
            {(users ?? []).map((u) => (
              <div
                key={u.id}
                className="group flex items-center justify-between gap-3
                          bg-[#13161d] border border-white/6 rounded-xl px-4 py-3.5
                          transition-all duration-300
                          hover:border-white/10 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                {/* Avatar + info */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Monogram avatar */}
                  <div className="w-8 h-8 rounded-full bg-white/6 border border-white/8 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-white/50 uppercase">
                      {u.email?.[0] ?? "?"}
                    </span>
                  </div>
    
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white/80 truncate">{u.email}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border
                        ${u.role === "admin"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        }`}>
                        <span className={`w-1 h-1 rounded-full ${u.role === "admin" ? "bg-amber-400" : "bg-emerald-400"}`} />
                        {u.role}
                      </span>
                    </div>
                  </div>
                </div>
    
                {/* Delete */}
                <button
                  onClick={() => handleDelete(u.id)}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                            text-white/25 border border-transparent
                            hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5
                            transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
    
      </div>
    
    </Layout>
  );
}