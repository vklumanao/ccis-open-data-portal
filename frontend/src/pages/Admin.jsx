import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";
import AddDatasetForm from "../components/AddDatasetForm";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="card card--soft">
        Loading admin dashboard...
        <br />
        <pre>{JSON.stringify({ user, error }, null, 2)}</pre>
      </div>
    );
  if (error)
    return (
      <div className="card card--muted">
        Error: {error.message}
        <br />
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (!user || !user.sysadmin)
    return (
      <div className="card card--muted">
        Access denied. Admins only.
        <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    );

  return (
    <div className="page-grid" style={{ gap: 32 }}>
      <div className="card card--soft">
        <h1>Admin Dashboard</h1>
        <p className="lead">Welcome, {user.display_name || user.name}!</p>
        <div className="caption">You are a CKAN sysadmin.</div>
        <button
          className="btn"
          style={{ marginTop: 24 }}
          onClick={() => setShowForm(true)}
        >
          Add New Dataset
        </button>
      </div>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.25)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
              padding: 0,
              minWidth: 400,
              maxWidth: 640,
              width: "100%",
            }}
          >
            <button
              onClick={() => setShowForm(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                color: "#888",
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div>
              <AddDatasetForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
