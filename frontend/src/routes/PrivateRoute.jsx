import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../pages/authentication/UserContext";

const PrivateRoute = () => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
