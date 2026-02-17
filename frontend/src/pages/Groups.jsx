import { useQuery } from "@tanstack/react-query";
import { listGroups } from "../api/ckan";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import { Link } from "react-router-dom";

export default function Groups() {
  const q = useQuery({ queryKey: ["groups"], queryFn: listGroups });

  if (q.isLoading) return <Loading text="Loading categories..." />;
  if (q.isError) return <ErrorBox error={q.error} />;

  return (
    <div className="page-grid">
      <h1
        style={{
          marginTop: 0,
          marginBottom: "var(--spacing-lg)",
          fontSize: "var(--font-size-3xl)",
          color: "var(--text-primary)",
        }}
      >
        Categories
      </h1>
      <div className="grid grid-cards">
        {q.data.map((g) => (
          <div
            key={g.id}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100%",
              height: "100%",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "var(--spacing-md)",
                fontSize: "var(--font-size-lg)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--text-primary)",
              }}
            >
              {g.title || g.name}
            </h3>
            <p
              style={{
                marginBottom: "var(--spacing-lg)",
                opacity: 0.85,
                flex: 1,
                fontSize: "var(--font-size-sm)",
                color: "var(--text-secondary)",
              }}
            >
              {(g.description || "").slice(0, 140)}
              {(g.description || "").length > 140 ? "..." : ""}
            </p>
            <Link
              to={`/groups/${g.name}`}
              style={{
                fontWeight: "var(--font-weight-bold)",
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
              View Category →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
