import { Link, Loader, MyInput } from "@/components/common";
import { LoginSchema } from "@/schema";
import { useFormik } from "formik";
import { scrollToTop, toast } from "@/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store";
import { SOIESLogo } from "@/assets/common";
import { useEffect } from "react";

const Login = ({ forStudent = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const { loginUserData } = useSelector((s) => s.authReducer);

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
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (body) => {
      localStorage.setItem("email", body.email);

      dispatch(
        loginUser({
          payload: {
            body: {
              usernameOrEmail: body.email,
              password: body.password,
            },
          },
          onSuccess: (res) => {
            navigate("/", { replace: true });
            localStorage.setItem(
              "userType",
              res.role === "ROLE_STUDENT" ? "student" : "teacher"
            );
            toast.success("Logged in successfully!");
          },
        })
      );
    },
  });

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <div className="w-3/4 min-h-screen grid items-center grid-cols-1 p-[5rem] md:p-[5rem_5rem_5rem_0rem]">
      <div className="grid gap-[4.3rem] max-w-[73rem] p-16">
        <img className="w-[8rem]" src={SOIESLogo} alt="Silver Oaks Icon" />
        <div className="grid gap-[1.2rem]">
          <h1 className="text-custom-red text-[3.8rem] font-bold leading-[140%]">
            Welcome
          </h1>

          <p className="text-[#363848] text-[2rem] leading-[185%]">
            Please fill your detail to access your account.
          </p>
        </div>

        <form className="grid gap-[4.4rem]" onSubmit={handleSubmit}>
          <div className="grid gap-[3.7rem]">
            <MyInput
              type="text"
              label="Username/Email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              // error={touched.email && errors.email}
              value={values.email}
            />
            <MyInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              value={values.password}
            />
          </div>

          <div className="grid gap-[4.5rem]">
            <div className="grid grid-cols-2">
              <MyInput type="checkbox" label="Remember me" />
              <div className="grid justify-end opacity">
                {/* <Link
                className="text-custom-red text-[1.8rem] underline"
                to="/forget-password"
              >
                Forgot Password?
              </Link> */}
              </div>
            </div>

            <div>
              <button
                className="relative overflow-hidden w-full bg-custom-red text-white text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isValid || !dirty || loginUserData?.loading}
              >
                {loginUserData?.loading && (
                  <Loader
                    type="button"
                    className="!bg-custom-red"
                    secondaryColor="#F4D06F"
                    color="#fdbb05"
                  />
                )}
                Sign In
              </button>
            </div>
          </div>
        </form>
        <span className="text-center text-2xl font-bold">OR</span>

        <div>
          <button
            onClick={() => navigate(forStudent ? "/login" : "/student-login")}
            className="relative overflow-hidden w-full bg-white border border-custom-red text-custom-red text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled={!isValid || !dirty || loginUserData?.loading}
          >
            {`Login as ${forStudent ? "Teacher" : "Student"}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
