import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../reducer/userSlice";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const account = useSelector(selectUser);
  const location = useLocation();

  // If account or account.isLogin is undefined, return null
  if (account === undefined || account.isLogin === undefined) {
    return null;
  }

  // Otherwise, proceed as before
  return account.isLogin ? (
    <>{element}</> // Wrapping the element with Fragment to ensure a ReactElement is returned.
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
