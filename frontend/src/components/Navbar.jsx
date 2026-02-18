import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

// Utility functions to check login and admin status
function isLoggedIn() {
  return !!localStorage.getItem("ckan_api_token");
}

function getCurrentUser() {
  const userStr = localStorage.getItem("ckan_user");
  return userStr ? JSON.parse(userStr) : null;
}

const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Navbar() {
  const loggedIn = isLoggedIn();
  const user = getCurrentUser();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src="/src/assets/images/logo/ccis-logo.webp"
            alt="CSU CCIS Logo"
            className="brand-icon"
            style={{ height: "100px", width: "auto", objectFit: "contain" }}
          />
          <img
            src="/src/assets/images/logo/chci-logo.png"
            alt="CHCI Logo"
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
          {/* Show admin link if user is sysadmin */}
          {loggedIn && user?.sysadmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
          {/* Show login/logout links */}
          {!loggedIn ? (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          ) : (
            <button
              className="nav-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("ckan_user");
                localStorage.removeItem("ckan_api_token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
