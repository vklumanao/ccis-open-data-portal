import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>404</h1>
      <p style={{ opacity: 0.85 }}>Page not found.</p>
      <Link to="/" style={{ fontWeight: 900, textDecoration: "none" }}>
        Go Home →
      </Link>
    </div>
  );
}
