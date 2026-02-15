export default function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 30 }}
    >
      <div className="container" style={{ opacity: 0.75 }}>
        © {new Date().getFullYear()} CCIS Open Data Portal • Powered by CKAN
      </div>
    </footer>
  );
}
