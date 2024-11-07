import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../Component/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />
  if (user?.email) return children;

  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
