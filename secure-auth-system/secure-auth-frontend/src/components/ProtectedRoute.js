import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute token:", token); // Debug: check token on every protected route render
  console.log("Current path:", window.location.pathname); // Debug: log where access control is applied

  return token ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
