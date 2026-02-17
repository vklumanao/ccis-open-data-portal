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
    <div className="page-grid">
      <section className="card">
        <h1
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-md)",
            fontSize: "var(--font-size-3xl)",
            color: "var(--text-primary)",
          }}
        >
          {ds.title || ds.name}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "var(--spacing-md)",
            flexWrap: "wrap",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          {ds.organization?.title ? (
            <Badge variant="accent">{ds.organization.title}</Badge>
          ) : null}
          {(ds.tags || []).slice(0, 5).map((t) => (
            <Badge key={t.name} variant="default">
              #{t.name}
            </Badge>
          ))}
        </div>

        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "var(--spacing-lg)",
          }}
        >
          {ds.notes || "No description provided."}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--spacing-lg)",
            padding: "var(--spacing-lg)",
            background: "var(--background)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Author
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {ds.author || "—"}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Maintainer
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {ds.maintainer || "—"}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              License
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {ds.license_title || ds.license_id || "—"}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--text-light)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Last Updated
            </div>
            <div
              style={{
                color: "var(--text-primary)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {new Date(ds.metadata_modified).toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-lg)",
            fontSize: "var(--font-size-2xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--text-primary)",
          }}
        >
          Resources
        </h2>
        <ResourceList resources={ds.resources || []} />
      </section>

      <section className="card">
        <h3
          style={{
            marginTop: 0,
            marginBottom: "var(--spacing-lg)",
            fontSize: "var(--font-size-xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--text-primary)",
          }}
        >
          Metadata Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--spacing-xl)",
          }}
        >
          {/* Dataset Information */}
          <div>
            <h4
              style={{
                margin: "0 0 var(--spacing-lg)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Dataset Information
            </h4>
            <div
              style={{
                display: "grid",
                gap: "var(--spacing-lg)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Dataset ID
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    wordBreak: "break-all",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--font-size-xs)",
                    background: "var(--background)",
                    padding: "var(--spacing-md)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {ds.id}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Created
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {new Date(ds.metadata_created).toLocaleString()}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Last Updated
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {new Date(ds.metadata_modified).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Access & Licensing */}
          <div>
            <h4
              style={{
                margin: "0 0 var(--spacing-lg)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Access & Licensing
            </h4>
            <div
              style={{
                display: "grid",
                gap: "var(--spacing-lg)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Visibility
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {ds.private ? "Private" : "Public"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Open Data
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {ds.isopen ? "Yes" : "No"}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  License
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {ds.license_title || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          {/* Resources & Details */}
          <div>
            <h4
              style={{
                margin: "0 0 var(--spacing-lg)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Resources & Details
            </h4>
            <div
              style={{
                display: "grid",
                gap: "var(--spacing-lg)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Resources
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {ds.num_resources} file{ds.num_resources !== 1 ? "s" : ""}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Tags
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  {ds.num_tags} tag{ds.num_tags !== 1 ? "s" : ""}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--text-secondary)",
                    marginBottom: "var(--spacing-sm)",
                  }}
                >
                  Status
                </div>
                <div
                  style={{
                    color: "var(--text-secondary)",
                    textTransform: "capitalize",
                  }}
                >
                  {ds.state || "active"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
