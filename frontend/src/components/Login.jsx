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
    <form onSubmit={handleLogin} className="flex items-center gap-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="border rounded px-3 py-1 text-sm"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border rounded px-3 py-1 text-sm"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
      >
        Login
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
    </form>
  );
}

export default Login;
