import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>Too Secure Portal</h1>
      <p>Welcome, {user?.role}</p>

      {user?.role === "admin" ? (
        <>
          <Link to="/users">Manage Users</Link>
          <br />
          <Link to="/logs">View Logs</Link>
        </>
      ) : (
        <p>
          Your account is active and securely
          authenticated.
        </p>
      )}
    </Layout>
  );
}