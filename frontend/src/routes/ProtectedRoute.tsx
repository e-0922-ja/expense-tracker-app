import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { paths } from "../constants/routePaths";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  const { session, loading } = useSupabaseSession();

  if (loading) return null;

  return session ? (
    <>{element}</>
  ) : (
    <Navigate to={paths.login} state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
