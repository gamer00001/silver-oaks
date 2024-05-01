import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userType = localStorage.getItem("userType");
  const { loginUserData } = useSelector((s) => s.authReducer);

  if (userType === "admin") {
    return <Outlet />;
  }

  return loginUserData?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
