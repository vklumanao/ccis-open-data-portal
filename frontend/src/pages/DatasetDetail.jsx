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
        <h3 style={{ marginTop: 0 }}>Additional Information</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          {/* Dataset Information */}
          <div>
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Dataset Information
            </h4>
            <div
              style={{
                display: "grid",
                gap: 8,
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              <div>
                <b>Dataset ID:</b>
              </div>
              <div
                style={{
                  opacity: 0.8,
                  wordBreak: "break-all",
                  fontSize: "0.85rem",
                }}
              >
                {ds.id}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Created:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {new Date(ds.metadata_created).toLocaleString()}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Last Updated:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {new Date(ds.metadata_modified).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Access & Licensing */}
          <div>
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Access & Licensing
            </h4>
            <div
              style={{
                display: "grid",
                gap: 8,
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              <div>
                <b>Visibility:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {ds.private ? "Private" : "Public"}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Open Data:</b>
              </div>
              <div style={{ opacity: 0.8 }}>{ds.isopen ? "Yes" : "No"}</div>
              <div style={{ marginTop: 8 }}>
                <b>License:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {ds.license_title || "Not specified"}
              </div>
            </div>
          </div>

          {/* Resources & Details */}
          <div>
            <h4
              style={{
                margin: "0 0 12px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Resources & Details
            </h4>
            <div
              style={{
                display: "grid",
                gap: 8,
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              <div>
                <b>Resources:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {ds.num_resources} file{ds.num_resources !== 1 ? "s" : ""}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Tags:</b>
              </div>
              <div style={{ opacity: 0.8 }}>
                {ds.num_tags} tag{ds.num_tags !== 1 ? "s" : ""}
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Status:</b>
              </div>
              <div style={{ opacity: 0.8, textTransform: "capitalize" }}>
                {ds.state}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
