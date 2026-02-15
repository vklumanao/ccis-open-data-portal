export default function Badge({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.16)",
        fontSize: 12,
        opacity: 0.9,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      {children}
    </span>
  );
}
