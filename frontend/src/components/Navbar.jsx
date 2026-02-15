import { NavLink } from "react-router-dom";

const link = ({ isActive }) => ({
  textDecoration: "none",
  fontWeight: isActive ? 900 : 700,
  opacity: isActive ? 1 : 0.85,
});

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div
        className="container"
        style={{ display: "flex", gap: 16, alignItems: "center" }}
      >
        <div style={{ fontWeight: 900 }}>CCIS Open Data Portal</div>
        <nav style={{ display: "flex", gap: 14 }}>
          <NavLink to="/" style={link}>
            Home
          </NavLink>
          <NavLink to="/datasets" style={link}>
            Datasets
          </NavLink>
          <NavLink to="/orgs" style={link}>
            Organizations
          </NavLink>
          <NavLink to="/groups" style={link}>
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
