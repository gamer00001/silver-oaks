import { Loader, MyInput } from "@/components/common";
import { ResetPassSchema } from "@/schema";
import { useFormik } from "formik";
import { toast } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store";
import { useQueryParams } from "@/hooks";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetPasswordData } = useSelector((s) => s.authReducer);
  const { token } = useQueryParams({ token: "" });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPassSchema,
    onSubmit: (v) => {
      dispatch(
        resetPassword({
          payload: {
            body: { newPassword: v.password, token: decodeURIComponent(token) },
          },
          onSuccess: () => {
            navigate("/login", { replace: true });
            toast.success("Reset Password successfully!");
          },
        })
      );
    },
  });
  return (
    <div className="w-full min-h-screen grid items-center grid-cols-1 p-[5rem] md:p-[5rem_5rem_5rem_0rem]">
      <div className="grid gap-[4.3rem] max-w-[73rem]">
        <div className="grid gap-[1.2rem]">
          <h1 className="text-[#363848] text-[3.8rem] font-bold leading-[140%]">
            Reset Password
          </h1>

          <p className="text-[#363848] text-[2rem] leading-[185%]">
            Create new password for login
          </p>
        </div>

        <form className="grid gap-[4.4rem]" onSubmit={handleSubmit}>
          <div className="grid gap-[3.7rem]">
            <MyInput
              type="password"
              label="New Password"
              placeholder="Enter new password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              value={values.password}
            />
            <MyInput
              type="password"
              label="Password"
              placeholder="Enter confirm password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
              value={values.confirmPassword}
            />
          </div>

          <button
            className="relative overflow-hidden w-full bg-[#395556] text-white text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid || !dirty || resetPasswordData?.loading}
          >
            {resetPasswordData?.loading && (
              <Loader
                type="button"
                className="!bg-[#395556]"
                secondaryColor="#F4D06F"
                color="#fdbb05"
              />
            )}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
