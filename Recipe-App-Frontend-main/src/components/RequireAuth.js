import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Represents a component that requires authentication and role-based access.
 * @param {Object} props - The component props.
 * @param {Array} props.allowedRoles - An array of allowed roles for accessing the component.
 * @returns {JSX.Element} The RequireAuth component.
 */
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : auth?.accessToken ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
