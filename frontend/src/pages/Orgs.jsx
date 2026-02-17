import { useQuery } from "@tanstack/react-query";
import { listOrgs } from "../api/ckan";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import { Link } from "react-router-dom";

export default function Orgs() {
  const q = useQuery({ queryKey: ["orgs"], queryFn: listOrgs });

  if (q.isLoading) return <Loading text="Loading organizations..." />;
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
        Organizations
      </h1>

      <div className="grid grid-cards">
        {q.data.map((o) => {
          const imageUrl = o.image_display_url || o.image_url;

          return (
            <div
              key={o.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
                height: "100%",
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl || "/placeholder-org.png"}
                  alt={o.title || o.name}
                  style={{
                    width: "calc(100% + var(--spacing-xl) * 2)",
                    height: 220,
                    objectFit: "cover",
                    margin:
                      "calc(var(--spacing-xl) * -1) calc(var(--spacing-xl) * -1) var(--spacing-lg) calc(var(--spacing-xl) * -1)",
                    borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
                  }}
                />
              )}

              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "var(--spacing-md)",
                  fontSize: "var(--font-size-lg)",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--text-primary)",
                }}
              >
                {o.title || o.name}
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
                {(o.description || "").slice(0, 140)}
                {(o.description || "").length > 140 ? "..." : ""}
              </p>

              <Link
                to={`/orgs/${o.name}`}
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
                View Organization →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
