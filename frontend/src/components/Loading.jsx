export default function Loading({ text = "Loading..." }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-md)",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid var(--border-light)",
          borderTop: "2px solid var(--primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-size-sm)",
          color: "var(--text-secondary)",
        }}
      >
        {text}
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
