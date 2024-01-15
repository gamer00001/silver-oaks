import { Loader, MyInput } from "@/components/common";
import { changePassSchema } from "@/schema";
import { changePassword } from "@/store";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MyProfileChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changePasswordData } = useSelector((s) => s.authReducer);
  const {
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePassSchema,
    onSubmit: (values) => {
      const body = { ...values };
      delete body.confirmPassword;
      dispatch(
        changePassword({
          payload: { body },
          onSuccess: () => {
            toast.success("Successfully Change Password!");
            navigate("/my-profile");
          },
        })
      );
    },
  });
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[4.3rem] content-start max-w-[72rem]">
          <div className="grid gap-[1.2rem]">
            <h1 className="text-[#363848] text-[3.8rem] font-bold leading-[120%]">
              Change Password
            </h1>
            <p className="text-[#363848] text-[1.9rem] leading-[180%]">
              Use Credentials to your Account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-[6.7rem]">
            <div className="grid gap-[3rem]">
              <MyInput
                label="Old Password"
                value={values.oldPassword}
                name="oldPassword"
                error={touched.oldPassword && errors.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
              <MyInput
                label="New Password"
                value={values.newPassword}
                name="newPassword"
                error={touched.newPassword && errors.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
              <MyInput
                label="Confirm Password"
                value={values.confirmPassword}
                name="confirmPassword"
                error={touched.confirmPassword && errors.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
              />
            </div>
            <div>
              <div className="grid justify-start content-start gap-[1.6rem] grid-cols-2">
                <button
                  className="relative overflow-hidden p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-transparent text-custom-dark-gren bg-custom-button-color opacity-button disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!isValid || !dirty || changePasswordData?.loading}
                  type="submit"
                >
                  {changePasswordData?.loading && <Loader type="button" />}
                  Change Password
                </button>
                <Link
                  className="text-center p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-[#39555657] text-[#1A1B25] opacity"
                  to="/my-profile"
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfileChangePassword;
