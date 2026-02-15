import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDataset } from "../api/ckan";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import Badge from "../components/Badge";
import ResourceList from "../components/ResourceList";

export default function DatasetDetail() {
  const { id } = useParams();

  const q = useQuery({
    queryKey: ["dataset", id],
    queryFn: () => getDataset(id),
  });

  if (q.isLoading) return <Loading text="Loading dataset..." />;
  if (q.isError) return <ErrorBox error={q.error} />;

  const ds = q.data;

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>{ds.title || ds.name}</h1>
        {ds.organization?.title ? <Badge>{ds.organization.title}</Badge> : null}
        {(ds.tags || []).map((t) => (
          <Badge key={t.name}>#{t.name}</Badge>
        ))}

        <p style={{ opacity: 0.85 }}>
          {ds.notes || "No description provided."}
        </p>

        <div style={{ display: "grid", gap: 6, opacity: 0.85 }}>
          <div>
            <b>Author:</b> {ds.author || "—"}
          </div>
          <div>
            <b>Maintainer:</b> {ds.maintainer || "—"}
          </div>
          <div>
            <b>Last updated:</b> {ds.metadata_modified || "—"}
          </div>
          <div>
            <b>License:</b> {ds.license_title || ds.license_id || "—"}
          </div>
        </div>
      </section>

      <section>
        <h2>Resources</h2>
        <ResourceList resources={ds.resources || []} />
      </section>

      <section className="card">
        <h3 style={{ marginTop: 0 }}>Raw Metadata (debug)</h3>
        <pre style={{ whiteSpace: "pre-wrap", opacity: 0.85 }}>
          {JSON.stringify(ds, null, 2)}
        </pre>
      </section>
    </div>
  );
}
