export default function ErrorBox({ error }) {
  return (
    <div
      style={{
        background: "rgba(231, 76, 60, 0.08)",
        border: "1.5px solid rgba(231, 76, 60, 0.3)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
      }}
    >
      <div
        style={{
          fontWeight: "var(--font-weight-bold)",
          color: "var(--error)",
          fontSize: "var(--font-size-base)",
          marginBottom: "var(--spacing-md)",
        }}
      >
        ⚠ Error
      </div>
      <p
        style={{
          margin: 0,
          color: "var(--text-secondary)",
          fontSize: "var(--font-size-sm)",
          lineHeight: 1.6,
        }}
      >
        {error?.message || "Something went wrong."}
      </p>
    </div>
  );
}
