import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      await login(apiKey);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      className="page-grid"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--background-alt)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          boxShadow: "var(--shadow-md)",
          padding: 32,
          minWidth: 340,
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>
          CKAN API Key Login
        </div>
        <div
          style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 18 }}
        >
          Paste your CKAN API token to access admin features.
        </div>
        <input
          type="text"
          placeholder="Enter CKAN API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="input"
          style={{
            marginBottom: 16,
            width: "100%",
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid var(--border)",
            padding: "10px 14px",
          }}
          autoFocus
        />
        {error && (
          <div
            className="caption"
            style={{ color: "var(--error)", marginBottom: 12 }}
          >
            {error}
          </div>
        )}
        <button
          className="btn"
          type="submit"
          disabled={pending}
          style={{
            width: "100%",
            fontSize: 16,
            borderRadius: 6,
            padding: "12px 0",
            marginTop: 4,
          }}
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
