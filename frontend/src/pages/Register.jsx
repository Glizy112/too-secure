import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleRegister}>
        Sign Up
      </button>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}