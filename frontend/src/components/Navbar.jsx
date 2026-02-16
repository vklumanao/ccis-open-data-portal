import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src="\src\assets\images\logo\CSU-CCIS-Black-scaled.webp"
            alt="CSU CCIS Logo"
            className="brand-icon"
            style={{ height: "100px", width: "auto", objectFit: "contain" }}
          />
          <div className="brand-text">
            <div className="brand-name">CCIS Open Data Portal</div>
            <div className="brand-subtitle">Caraga State University</div>
          </div>
        </div>
        <nav className="navbar-nav">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/datasets" className={navLinkClass}>
            Datasets
          </NavLink>
          <NavLink to="/orgs" className={navLinkClass}>
            Organizations
          </NavLink>
          <NavLink to="/groups" className={navLinkClass}>
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
