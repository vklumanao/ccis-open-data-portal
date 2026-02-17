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
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "var(--spacing-lg)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--background-alt)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          maxWidth: "90vw",
          maxHeight: "85vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--spacing-lg) var(--spacing-xl)",
            borderBottom: "1px solid var(--border-light)",
            background: "var(--background)",
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 4px",
                fontSize: "var(--font-size-lg)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--text-primary)",
              }}
            >
              {resource.name}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-sm)",
                color: "var(--text-light)",
              }}
            >
              {resource.format || "File"} • Preview
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1,
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-md)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
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
            padding: "var(--spacing-xl)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading && (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-base)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid var(--border-light)",
                  borderTop: "3px solid var(--primary)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto var(--spacing-lg)",
                }}
              />
              Loading preview...
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}
          {error && (
            <div
              style={{
                background: "rgba(231, 76, 60, 0.08)",
                border: "1.5px solid rgba(231, 76, 60, 0.3)",
                borderRadius: "var(--radius-md)",
                padding: "var(--spacing-lg)",
                color: "var(--error)",
                maxWidth: "500px",
              }}
            >
              <div style={{ fontWeight: "var(--font-weight-bold)" }}>
                ⚠ Preview Error
              </div>
              <p
                style={{
                  margin: "var(--spacing-sm) 0 0",
                  fontSize: "var(--font-size-sm)",
                }}
              >
                {error}
              </p>
            </div>
          )}
          {data && !loading && (
            <div style={{ width: "100%" }}>
              {data.isPDF ? (
                // PDF preview message
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "56px",
                      marginBottom: "var(--spacing-lg)",
                    }}
                  >
                    📄
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--font-size-lg)",
                      fontWeight: "var(--font-weight-bold)",
                      margin: "0 0 var(--spacing-md)",
                    }}
                  >
                    PDF Preview
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "var(--spacing-lg)",
                      fontSize: "var(--font-size-base)",
                    }}
                  >
                    PDF files cannot be previewed inline. Please download the
                    file to view it in your PDF reader.
                  </p>
                </div>
              ) : typeof data === "string" ? (
                // CSV or Text preview
                <pre
                  style={{
                    background: "var(--background)",
                    padding: "var(--spacing-lg)",
                    borderRadius: "var(--radius-md)",
                    overflow: "auto",
                    margin: 0,
                    fontSize: "var(--font-size-sm)",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {data.slice(0, 5000)} {/* Limit preview to 5000 chars */}
                  {data.length > 5000 && (
                    <div
                      style={{
                        marginTop: "var(--spacing-lg)",
                        fontStyle: "italic",
                        color: "var(--text-light)",
                        fontSize: "var(--font-size-xs)",
                      }}
                    >
                      ... ({data.length} characters total, preview truncated)
                    </div>
                  )}
                </pre>
              ) : (
                // JSON preview
                <pre
                  style={{
                    background: "var(--background)",
                    padding: "var(--spacing-lg)",
                    borderRadius: "var(--radius-md)",
                    overflow: "auto",
                    margin: 0,
                    fontSize: "var(--font-size-sm)",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-light)",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {JSON.stringify(data, null, 2).slice(0, 5000)}
                  {JSON.stringify(data, null, 2).length > 5000 && (
                    <div
                      style={{
                        marginTop: "var(--spacing-lg)",
                        fontStyle: "italic",
                        color: "var(--text-light)",
                        fontSize: "var(--font-size-xs)",
                      }}
                    >
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
            gap: "var(--spacing-md)",
            padding: "var(--spacing-lg) var(--spacing-xl)",
            borderTop: "1px solid var(--border-light)",
            background: "var(--background)",
            justifyContent: "flex-end",
          }}
        >
          <a
            href={resource.url}
            download
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-md)",
              background: "var(--primary)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--font-size-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--primary-light)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "var(--primary)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Download Full File
          </a>
          <button
            onClick={onClose}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-md)",
              background: "transparent",
              border: "1.5px solid var(--border)",
              color: "var(--text-secondary)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--font-size-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.color = "var(--text-secondary)";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
