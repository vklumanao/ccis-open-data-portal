export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: {
      background: "rgba(26, 95, 63, 0.12)",
      border: "1px solid rgba(26, 95, 63, 0.3)",
      color: "var(--primary)",
    },
    accent: {
      background: "rgba(243, 156, 18, 0.12)",
      border: "1px solid rgba(243, 156, 18, 0.3)",
      color: "var(--accent)",
    },
    secondary: {
      background: "rgba(85, 85, 85, 0.08)",
      border: "1px solid rgba(85, 85, 85, 0.2)",
      color: "var(--text-secondary)",
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "6px 12px",
        borderRadius: "999px",
        border: style.border,
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-medium)",
        color: style.color,
        background: style.background,
        marginRight: 4,
        marginBottom: 4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
