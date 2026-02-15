import { Link } from "react-router-dom";
import Badge from "./Badge.jsx";

export default function DatasetCard({ dataset }) {
  return (
    <div className="card">
      <h3 style={{ margin: "0 0 8px" }}>{dataset.title || dataset.name}</h3>
      <p style={{ margin: "0 0 10px", opacity: 0.8 }}>
        {(dataset.notes || "").slice(0, 160)}
        {(dataset.notes || "").length > 160 ? "..." : ""}
      </p>

      <div style={{ marginBottom: 10 }}>
        {dataset.organization?.title && (
          <Badge>{dataset.organization.title}</Badge>
        )}
        {(dataset.tags || []).slice(0, 3).map((t) => (
          <Badge key={t.name}>#{t.name}</Badge>
        ))}
      </div>

      <Link
        to={`/dataset/${dataset.name}`}
        style={{ fontWeight: 800, textDecoration: "none" }}
      >
        View dataset →
      </Link>
    </div>
  );
}
