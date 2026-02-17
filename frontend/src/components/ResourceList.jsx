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
    return (
      <p
        style={{
          opacity: 0.7,
          fontSize: "var(--font-size-base)",
          color: "var(--text-secondary)",
        }}
      >
        No resources yet.
      </p>
    );

  return (
    <>
      <div className="grid" style={{ gap: "var(--spacing-lg)" }}>
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
                gap: "var(--spacing-lg)",
                flex: 1,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1, minWidth: 200 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-md)",
                    marginBottom: "var(--spacing-md)",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: "var(--font-size-base)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {r.name || "Resource"}
                  </span>
                  {r.size && (
                    <span
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--text-light)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      • {formatFileSize(r.size)}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--spacing-sm)",
                    flexWrap: "wrap",
                  }}
                >
                  {r.format && (
                    <Badge>
                      {getFormatIcon(r.format)} {r.format}
                    </Badge>
                  )}
                  {r.mimetype && r.mimetype !== r.format && (
                    <Badge variant="secondary">{r.mimetype}</Badge>
                  )}
                  {r.last_modified && (
                    <Badge variant="secondary">
                      {new Date(r.last_modified).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-md)",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {isPreviewable(r.format) && (
                  <button
                    onClick={() => setPreviewResource(r)}
                    style={{
                      padding: "var(--spacing-sm) var(--spacing-lg)",
                      borderRadius: "var(--radius-md)",
                      background: "transparent",
                      border: "1.5px solid var(--primary)",
                      color: "var(--primary)",
                      cursor: "pointer",
                      fontWeight: "var(--font-weight-semibold)",
                      fontSize: "var(--font-size-sm)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(26, 95, 63, 0.08)";
                      e.target.style.borderColor = "var(--primary-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.borderColor = "var(--primary)";
                    }}
                    title={`Preview ${r.format} file`}
                  >
                    Preview
                  </button>
                )}
                <a
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--spacing-sm) var(--spacing-lg)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--primary)",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "var(--font-weight-semibold)",
                    fontSize: "var(--font-size-sm)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                  href={r.url}
                  download
                  title="Download"
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--primary-light)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "var(--primary)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Download
                </a>
              </div>
            </div>

            {r.description ? (
              <p
                style={{
                  marginTop: "var(--spacing-lg)",
                  opacity: 0.8,
                  fontSize: "var(--font-size-sm)",
                  color: "var(--text-secondary)",
                }}
              >
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
