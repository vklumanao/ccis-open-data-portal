import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../api/ckan";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import DatasetCard from "../components/DatasetCard";

export default function GroupDetail() {
  const { id } = useParams();
  const q = useQuery({ queryKey: ["group", id], queryFn: () => getGroup(id) });

  if (q.isLoading) return <Loading text="Loading category..." />;
  if (q.isError) return <ErrorBox error={q.error} />;

  const group = q.data;

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>{group.title || group.name}</h1>
        <p style={{ opacity: 0.85 }}>
          {group.description || "No description."}
        </p>
      </section>

      <section>
        <h2>Datasets</h2>
        <div className="grid grid-cards">
          {(group.packages || []).map((ds) => (
            <DatasetCard key={ds.id} dataset={ds} />
          ))}
        </div>
      </section>
    </div>
  );
}
