import { Navigate } from "react-router-dom";

export const AuthenticatedRoute = ({ children }) => {
  const token = localStorage.getItem("auth-token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
