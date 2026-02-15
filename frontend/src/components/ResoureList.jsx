import Badge from "./Badge.jsx";

export default function ResourceList({ resources = [] }) {
  if (!resources.length)
    return <p style={{ opacity: 0.8 }}>No resources yet.</p>;

  return (
    <div className="grid" style={{ gap: 10 }}>
      {resources.map((r) => (
        <div key={r.id} className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <b>{r.name || "Resource"}</b>
              <div style={{ marginTop: 6 }}>
                {r.format && <Badge>{r.format}</Badge>}
                {r.mimetype && <Badge>{r.mimetype}</Badge>}
              </div>
            </div>

            <a
              className="input"
              style={{
                width: 140,
                textAlign: "center",
                textDecoration: "none",
              }}
              href={r.url}
              target="_blank"
              rel="noreferrer"
            >
              Open / Download
            </a>
          </div>

          {r.description ? (
            <p style={{ marginTop: 10, opacity: 0.8 }}>{r.description}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
