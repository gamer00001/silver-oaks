import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loginUserData } = useSelector((s) => s.authReducer);
  return <Outlet />;

  // return loginUserData?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
