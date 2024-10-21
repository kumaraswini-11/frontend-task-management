import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ProtectedLayout } from "./protected-layout";
import { isAuthenticated } from "@/lib/utils";

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};
