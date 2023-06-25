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
  if (!account || account.isLogin === undefined) {
    return null;
  }

  const redirectPath =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? "/expense-tracker-app/login"
      : "/login";

  // Otherwise, proceed as before
  return account.isLogin ? (
    <>{element}</> // Wrapping the element with Fragment to ensure a ReactElement is returned.
  ) : (
    <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;
