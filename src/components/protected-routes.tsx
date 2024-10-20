import { useUserStore } from "@/store/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ProtectedLayout } from "./protected-layout";

export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { userId } = useUserStore();

  if (userId.length <= 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
};
