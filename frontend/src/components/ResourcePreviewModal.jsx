import { useState, useEffect } from "react";

export default function ResourcePreviewModal({ resource, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and parse preview data
  useEffect(() => {
    const loadPreview = async () => {
      try {
        const format = resource.format?.toUpperCase();

        if (format === "PDF") {
          // For PDFs, just set a message since we can't easily preview in plain text
          setData({ isPDF: true, url: resource.url });
          setError(null);
        } else {
          const response = await fetch(resource.url);
          if (!response.ok) throw new Error("Failed to fetch resource");

          let parsedData;

          if (format === "JSON") {
            parsedData = await response.json();
          } else {
            const text = await response.text();
            parsedData = text;
          }

          setData(parsedData);
          setError(null);
        }
      } catch (err) {
        setError(err.message || "Failed to load preview");
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [resource.url]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--background-light)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          maxWidth: "90vw",
          maxHeight: "85vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 4px" }}>{resource.name}</h3>
            <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>
              {resource.format || "File"} • Preview
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading && (
            <div style={{ textAlign: "center", opacity: 0.8 }}>
              Loading preview...
            </div>
          )}
          {error && (
            <div
              style={{
                background: "rgba(255, 0, 0, 0.1)",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                borderRadius: "8px",
                padding: "12px",
                color: "#ff9999",
                maxWidth: "500px",
              }}
            >
              Error: {error}
            </div>
          )}
          {data && !loading && (
            <div style={{ width: "100%" }}>
              {data.isPDF ? (
                // PDF preview message
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📄</div>
                  <h3>PDF Preview</h3>
                  <p style={{ opacity: 0.8, marginBottom: "20px" }}>
                    PDF files cannot be previewed inline. Please download the file to view.
                  </p>
                </div>
              ) : typeof data === "string" ? (
                // CSV or Text preview
                <pre
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "12px",
                    borderRadius: "8px",
                    overflow: "auto",
                    margin: 0,
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {data.slice(0, 5000)} {/* Limit preview to 5000 chars */}
                  {data.length > 5000 && (
                    <div style={{ marginTop: "12px", fontStyle: "italic", opacity: 0.7 }}>
                      ... ({data.length} characters total)
                    </div>
                  )}
                </pre>
              ) : (
                // JSON preview
                <pre
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "12px",
                    borderRadius: "8px",
                    overflow: "auto",
                    margin: 0,
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {JSON.stringify(data, null, 2).slice(0, 5000)}
                  {JSON.stringify(data, null, 2).length > 5000 && (
                    <div style={{ marginTop: "12px", fontStyle: "italic", opacity: 0.7 }}>
                      ... (preview truncated)
                    </div>
                  )}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 20px",
            borderTop: "1px solid var(--border)",
            justifyContent: "flex-end",
          }}
        >
          <a
            href={resource.url}
            download
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "var(--primary)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Download Full File
          </a>
          <button
            onClick={onClose}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-main)",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
