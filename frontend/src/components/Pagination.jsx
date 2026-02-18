export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(0, 0, 0, 0.02)",
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        marginTop: "2rem",
      }}
    >
      <button
        style={{
          padding: "0.5rem 1rem",
          background: canPrev ? "var(--primary)" : "var(--border)",
          color: canPrev ? "white" : "var(--text-light)",
          border: "none",
          borderRadius: "0.375rem",
          fontWeight: 500,
          fontSize: "0.875rem",
          cursor: canPrev ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
          opacity: canPrev ? 1 : 0.5,
        }}
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
        onMouseEnter={(e) => {
          if (canPrev) {
            e.target.style.background = "var(--primary-light)";
            e.target.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (canPrev) {
            e.target.style.background = "var(--primary)";
            e.target.style.transform = "translateY(0)";
          }
        }}
      >
        ← Previous
      </button>

      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          minWidth: "150px",
          textAlign: "center",
        }}
      >
        Page <span style={{ fontWeight: 700 }}>{page}</span> of{" "}
        <span style={{ fontWeight: 700 }}>{totalPages}</span>
      </div>

      <button
        style={{
          padding: "0.5rem 1rem",
          background: canNext ? "var(--primary)" : "var(--border)",
          color: canNext ? "white" : "var(--text-light)",
          border: "none",
          borderRadius: "0.375rem",
          fontWeight: 500,
          fontSize: "0.875rem",
          cursor: canNext ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
          opacity: canNext ? 1 : 0.5,
        }}
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
        onMouseEnter={(e) => {
          if (canNext) {
            e.target.style.background = "var(--primary-light)";
            e.target.style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={(e) => {
          if (canNext) {
            e.target.style.background = "var(--primary)";
            e.target.style.transform = "translateY(0)";
          }
        }}
      >
        Next →
      </button>
    </div>
  );
}
