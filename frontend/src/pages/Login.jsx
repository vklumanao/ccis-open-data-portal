import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Example: Replace with your CKAN login logic
      const res = await fetch(
        "/ckan-api/api/3/action/user_show?id=" + encodeURIComponent(username),
        {
          headers: {
            Authorization: "Basic " + btoa(username + ":" + password),
          },
        },
      );
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || "Login failed");
      // Store user info and token
      localStorage.setItem("ckan_user", JSON.stringify(data.result));
      localStorage.setItem("ckan_api_token", data.result.apikey || "");
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="login-container"
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h1>Login</h1>
      {error && (
        <div className="error-box" style={{ color: "red", marginBottom: 16 }}>
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
