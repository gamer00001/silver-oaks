import { useEffect } from "react";
import { toast } from "@/utils";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAuthReducer } from "@/store";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuthReducer());
    toast.success("Logged out successfully!");
  }, [dispatch]);
  return <Navigate to="/login" replace />;
};

export default Logout;
