export default function ErrorBox({ error }) {
  return (
    <div className="card" style={{ borderColor: "rgba(255,0,0,0.35)" }}>
      <b style={{ color: "#ff6b6b" }}>Error</b>
      <p style={{ margin: "8px 0 0", opacity: 0.9 }}>
        {error?.message || "Something went wrong."}
      </p>
    </div>
  );
}
