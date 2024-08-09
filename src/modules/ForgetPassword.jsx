import { Loader, MyInput } from "@/components/common";
import { ForgetSchema } from "@/schema";
import { useFormik } from "formik";
import { toast } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "@/store";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgetPasswordData } = useSelector((s) => s.authReducer);
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
      email: "",
    },
    validationSchema: ForgetSchema,
    onSubmit: (body) => {
      dispatch(
        forgetPassword({
          payload: { body },
          onSuccess: () => {
            navigate("/reset-password", { replace: true });
            toast.success("Check your mail box!");
          },
        })
      );
    },
  });
  return (
    <div className="w-full min-h-screen grid items-center grid-cols-1 p-[5rem] md:p-[5rem_5rem_5rem_0rem]">
      <div className="grid gap-[4.3rem] max-w-[73rem] flex flex-col justify-center items-center">
        <div className="grid gap-[1.2rem]">
          <h1 className="text-custom-red text-[3.8rem] font-bold leading-[140%]">
            Forgot Password
          </h1>

          <p className="text-[#363848] text-[1.9rem] leading-[185%]">
            Enter your email account to reset your password
          </p>
        </div>

        <form className="grid gap-[4.4rem]" onSubmit={handleSubmit}>
          <MyInput
            type="text"
            label="Email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            value={values.email}
          />

          <div>
            <div className="grid grid-cols-2 gap-12">
              <button
                className="relative overflow-hidden w-full bg-white text-custom-red border-2 border-custom-red text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => window.open("/login", "_self")}
              >
                Cancel
              </button>
              <button
                className="relative overflow-hidden w-full bg-custom-red text-white text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isValid || !dirty || forgetPasswordData?.loading}
              >
                {forgetPasswordData?.loading && (
                  <Loader
                    type="button"
                    className="!bg-custom-red"
                    secondaryColor="#F4D06F"
                    color="#fdbb05"
                  />
                )}
                Send Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
