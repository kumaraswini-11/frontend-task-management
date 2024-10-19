import { useUserStore } from "@/store/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { userId } = useUserStore();

  if (!!userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
