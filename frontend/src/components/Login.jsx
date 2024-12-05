import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await api.post("/login", {
        username,
        password,
      });
      setSuccessMessage("Login successful!");
      login(); // Update auth context
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex gap-2 items-center">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="px-3 py-1 text-sm rounded border"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="px-3 py-1 text-sm rounded border"
      />
      <button
        type="submit"
        className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Login
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
    </form>
  );
}

export default Login;
