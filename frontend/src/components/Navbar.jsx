import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/navbar.css";

const navLinkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Navbar() {
  const { user, loading, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      await login(apiKey);
      setShowLogin(false);
      setApiKey("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setPending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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
          {user && user.sysadmin && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="navbar-auth">
          {loading ? (
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Loading...
            </span>
          ) : user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--background-alt)",
                borderRadius: 8,
                padding: "8px 16px",
                boxShadow: "var(--shadow-sm)",
                minWidth: 180,
              }}
            >
              {/* User avatar or placeholder */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#555",
                  marginRight: 8,
                  boxShadow: "var(--shadow-xs)",
                  overflow: "hidden",
                }}
              >
                {/* Debug: Show image_url as text */}
                {user.image_url && (
                  <span
                    style={{
                      fontSize: 11,
                      color: "#888",
                      wordBreak: "break-all",
                      display: "block",
                      marginTop: 2,
                    }}
                  >
                    {user.image_url}
                  </span>
                )}
                {/* Always try to render the image if image_url exists, fixing missing slash */}
                {user.image_url ? (
                  <img
                    src={
                      user.image_url.startsWith("http")
                        ? user.image_url
                        : `/ckan-api${user.image_url.startsWith("/") ? user.image_url : "/" + user.image_url}`
                    }
                    alt="avatar"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      marginTop: 4,
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  (user.display_name || user.name || "U")
                    .slice(0, 1)
                    .toUpperCase()
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--text-primary)",
                  }}
                >
                  {user.display_name || user.name}
                  {user.sysadmin && (
                    <span
                      className="label"
                      style={{
                        marginLeft: 8,
                        fontSize: 13,
                        background: "#e6f0ff",
                        color: "#2563eb",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      Admin
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {user.email || ""}
                </div>
              </div>
              <button
                className="btn secondary"
                onClick={handleLogout}
                style={{ fontSize: 14, padding: "6px 16px", borderRadius: 6 }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn secondary"
              style={{ fontSize: 14 }}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
