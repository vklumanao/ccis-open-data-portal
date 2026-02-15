export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button
        className="input"
        style={{ width: 120 }}
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <div style={{ opacity: 0.85 }}>
        Page <b>{page}</b> of <b>{totalPages}</b>
      </div>
      <button
        className="input"
        style={{ width: 120 }}
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
