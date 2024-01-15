import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnProtectedRoute = () => {
  const { loginUserData } = useSelector((s) => s.authReducer);
  return !loginUserData?.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default UnProtectedRoute;
