import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>טוען...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/home" />;

  return children;
};

export default ProtectedRoute;