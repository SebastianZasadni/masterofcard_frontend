import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Props } from "../RestrictedRoute/RestrictedRoute";

const ProtectedRoute = ({ component: Component, redirectTo = "/" }: Props) => {
  const isLogged = useAuth();
  const shouldRedirect = !isLogged;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

export default ProtectedRoute;
