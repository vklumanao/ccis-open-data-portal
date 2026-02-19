
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

export default function Login() {
  const [apiToken, setApiToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!apiToken) throw new Error("CKAN API Token is required");
      localStorage.setItem("ckanApiKey", apiToken);
      localStorage.setItem("ckan_api_token", apiToken);
      // Fetch user profile
      const user = await getCurrentUser();
      localStorage.setItem("ckan_user", JSON.stringify(user));
      setLoading(false);
      if (user && user.sysadmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  }

  return (
    <div
      className="login-container"
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h1>CKAN API Token Login</h1>
      {error && (
        <div className="error-box" style={{ color: "red", marginBottom: 16 }}>
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label>CKAN API Token:</label>
          <input
            type="text"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            required
            disabled={loading}
            style={{ width: "100%" }}
            placeholder="Paste your CKAN API token here"
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
