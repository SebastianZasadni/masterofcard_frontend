import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export interface Props {
  component: JSX.Element;
  redirectTo: string;
}

const RestrictedRoute = ({ component: Component, redirectTo = "/" }: Props) => {
  const isLogged = useAuth();
  return isLogged ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
