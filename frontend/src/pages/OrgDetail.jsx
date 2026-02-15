import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrg } from "../api/ckan";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import DatasetCard from "../components/DatasetCard";

export default function OrgDetail() {
  const { id } = useParams();
  const q = useQuery({ queryKey: ["org", id], queryFn: () => getOrg(id) });

  if (q.isLoading) return <Loading text="Loading organization..." />;
  if (q.isError) return <ErrorBox error={q.error} />;

  const org = q.data;

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>{org.title || org.name}</h1>
        <p style={{ opacity: 0.85 }}>{org.description || "No description."}</p>
      </section>

      <section>
        <h2>Datasets</h2>
        <div className="grid grid-cards">
          {(org.packages || []).map((ds) => (
            <DatasetCard key={ds.id} dataset={ds} />
          ))}
        </div>
      </section>
    </div>
  );
}
