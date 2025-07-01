import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Nếu có token → cho vào
  if (token) return children;

  // Nếu chưa login → đẩy về login
  return <Navigate to="/login" />;
}