import { Navigate } from "react-router-dom";

// Utility functions to check login and admin status
function isLoggedIn() {
  return !!localStorage.getItem("ckan_api_token");
}

function getCurrentUser() {
  const userStr = localStorage.getItem("ckan_user");
  return userStr ? JSON.parse(userStr) : null;
}

export default function ProtectedRoute({ children, requiredRole = "user" }) {
  const loggedIn = isLoggedIn();
  const user = getCurrentUser();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && user?.sysadmin !== true) {
    return <Navigate to="/" replace />;
  }

  return children;
}
