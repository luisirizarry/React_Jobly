import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../pages/authentication/UserContext";

const PrivateRoute = ({ requiredRole }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) return <Navigate to="/login" />;
  if (requiredRole && currentUser.role !== requiredRole)
    return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
