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
      <h2>User Management</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create User
      </button>

      <hr />

      {users.map((u) => (
        <div 
          key={u.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>{u.email}</strong>
          <p>Role: {u.role}</p>
          <button onClick={() => handleDelete(u.id)}>
            Delete
          </button>
        </div>
      ))}
    </Layout>
  );
}