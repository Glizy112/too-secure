import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkSession } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post("/auth/login", {
        email,
        password,
      });
      //setUser({ email });     //previous: coming from useAuth() redirects fast without checking current user.
      await checkSession();     //improved: checks currently logged-in user from backend and then redirects.
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}