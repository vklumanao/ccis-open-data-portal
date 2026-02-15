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
    <div className="grid" style={{ gap: 12 }}>
      <h1>Categories</h1>
      <div className="grid grid-cards">
        {q.data.map((g) => (
          <div key={g.id} className="card">
            <h3 style={{ marginTop: 0 }}>{g.title || g.name}</h3>
            <p style={{ opacity: 0.8 }}>
              {(g.description || "").slice(0, 140)}
              {(g.description || "").length > 140 ? "..." : ""}
            </p>
            <Link
              to={`/groups/${g.name}`}
              style={{ fontWeight: 900, textDecoration: "none" }}
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
