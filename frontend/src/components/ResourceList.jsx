import { useState } from "react";
import Badge from "./Badge.jsx";
import ResourcePreviewModal from "./ResourcePreviewModal.jsx";
import {
  formatFileSize,
  getFormatIcon,
  isPreviewable,
} from "../utils/formatters.js";

export default function ResourceList({ resources = [] }) {
  const [previewResource, setPreviewResource] = useState(null);

  if (!resources.length)
    return <p style={{ opacity: 0.8 }}>No resources yet.</p>;

  return (
    <>
      <div className="grid" style={{ gap: 10 }}>
        {resources.map((r) => (
          <div
            key={r.id}
            className="card"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flex: 1,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b>{r.name || "Resource"}</b>
                  {r.size && (
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      • {formatFileSize(r.size)}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {r.format && (
                    <Badge>
                      {getFormatIcon(r.format)} {r.format}
                    </Badge>
                  )}
                  {r.mimetype && r.mimetype !== r.format && (
                    <Badge>{r.mimetype}</Badge>
                  )}
                  {r.last_modified && (
                    <Badge style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      Updated: {new Date(r.last_modified).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                }}
              >
                {isPreviewable(r.format) && (
                  <button
                    onClick={() => setPreviewResource(r)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid var(--secondary)",
                      color: "var(--secondary)",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(212, 175, 55, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                    title={`Preview ${r.format} file`}
                  >
                    Preview
                  </button>
                )}
                {!isPreviewable(r.format) && r.format && (
                  <span
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.6,
                      padding: "4px 0",
                    }}
                  >
                    Download to view
                  </span>
                )}
                <a
                  className="input"
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "var(--primary)",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                  href={r.url}
                  download
                  title="Download"
                >
                  Download
                </a>
              </div>
            </div>

            {r.description ? (
              <p style={{ marginTop: 10, opacity: 0.8, fontSize: "0.9rem" }}>
                {r.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <ResourcePreviewModal
          resource={previewResource}
          onClose={() => setPreviewResource(null)}
        />
      )}
    </>
  );
}
