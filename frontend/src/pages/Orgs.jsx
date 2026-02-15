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
    <div className="grid" style={{ gap: 12 }}>
      <h1>Organizations</h1>

      <div className="grid grid-cards">
        {q.data.map((o) => {
          const imageUrl = o.image_display_url || o.image_url;

          return (
            <div key={o.id} className="card">
              {imageUrl && (
                <img
                  src={imageUrl || "/placeholder-org.png"}
                  alt={o.title || o.name}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />
              )}

              <h3 style={{ marginTop: 0 }}>{o.title || o.name}</h3>

              <p style={{ opacity: 0.8 }}>
                {(o.description || "").slice(0, 140)}
                {(o.description || "").length > 140 ? "..." : ""}
              </p>

              <Link
                to={`/orgs/${o.name}`}
                style={{ fontWeight: 900, textDecoration: "none" }}
              >
                View →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
