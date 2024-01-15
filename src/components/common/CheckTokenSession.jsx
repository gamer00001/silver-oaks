import { getUser, resetAuthReducer } from "@/store";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from ".";

const CheckTokenSession = ({ children }) => {
  const { loginUserData, isSessionExpired } = useSelector((s) => s.authReducer);
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const { token } = useMemo(
    () => ({
      token: loginUserData.token,
    }),
    [loginUserData]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isChecking) {
      return;
    }

    if (!token) {
      setIsChecking(false);
      return;
    }

    dispatch(
      getUser({
        onSuccess: () => {
          setIsChecking(false);
        },
        onError: () => {
          setIsChecking(false);
        },
      })
    );
  }, [dispatch, isChecking, token]);

  useEffect(() => {
    if (isSessionExpired) {
      setTimeout(() => {
        toast.error("Session has been expired!");
      }, 500);
      dispatch(resetAuthReducer());
      navigate("/login");
    }
  }, [dispatch, isSessionExpired, navigate]);

  return !isChecking && !isSessionExpired ? children : <Loader type="screen" />;
};

export default CheckTokenSession;
