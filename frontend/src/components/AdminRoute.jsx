import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { token, isAdmin } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (!isAdmin) return <div style={{ padding: 32 }}>Unauthorized</div>;
  return children;
}
