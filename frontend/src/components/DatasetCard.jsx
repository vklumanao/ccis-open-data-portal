import { Link } from "react-router-dom";
import Badge from "./Badge.jsx";

export default function DatasetCard({ dataset }) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        height: "100%",
        transition: "all 0.2s ease",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "var(--font-size-lg)",
          fontWeight: "var(--font-weight-bold)",
          color: "var(--text-primary)",
          lineHeight: 1.4,
        }}
      >
        {dataset.title || dataset.name}
      </h3>

      <p
        style={{
          margin: "0 0 12px",
          opacity: 0.8,
          flex: 1,
          fontSize: "var(--font-size-sm)",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {(dataset.notes || "").slice(0, 160)}
        {(dataset.notes || "").length > 160 ? "..." : ""}
      </p>

      <div
        style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 6 }}
      >
        {dataset.organization?.title && (
          <Badge>{dataset.organization.title}</Badge>
        )}
        {(dataset.tags || []).slice(0, 3).map((t) => (
          <Badge key={t.name}>#{t.name}</Badge>
        ))}
      </div>

      <Link
        to={`/dataset/${dataset.id}`}
        style={{
          fontWeight: 700,
          textDecoration: "none",
          marginTop: "auto",
          padding: "8px 12px",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid var(--primary)",
          color: "var(--primary)",
          textAlign: "center",
          transition: "all 0.2s ease",
          display: "block",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(26, 95, 63, 0.08)";
          e.target.style.borderColor = "var(--primary-light)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.borderColor = "var(--primary)";
        }}
      >
        View dataset →
      </Link>
    </div>
  );
}
