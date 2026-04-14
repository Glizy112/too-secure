import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/users">Users</Link> |{" "}
      <Link to="/logs">Logs</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}