import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return false;
};

export const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
