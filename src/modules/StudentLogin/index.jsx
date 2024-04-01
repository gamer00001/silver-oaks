import { Link, Loader, MyInput } from "@/components/common";
import { LoginSchema } from "@/schema";
import { useFormik } from "formik";
import { scrollToTop, toast } from "@/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store";
import { SOIESLogo } from "@/assets/common";
import { useEffect } from "react";

const StudentLogin = ({ forStudent = false }) => {
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
            console.log({ res });
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
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center ">
        <form
          className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-2/3"
          onSubmit={handleSubmit}
        >
          <img className="w-[8rem]" src={SOIESLogo} alt="Silver Oaks Icon" />
          <div className="flex flex-col gap-[1.2rem]">
            <h1 className="text-custom-red text-[3.8rem] font-bold leading-[140%]">
              Welcome
            </h1>

            <p className="text-[#363848] text-[2rem] leading-[185%]">
              Please fill your detail to access your account.
            </p>
          </div>
          <div className="flex flex-col gap-[3.7rem]">
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

          <div className="flex flex-col gap-[4.5rem] pt-12">
            <div className="flex flex-col grid-cols-2">
              <MyInput type="checkbox" label="Remember me" />
              <div className="flex flex-col justify-end opacity">
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
                type="submit"
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
          <div className="text-center text-2xl font-bold py-8">OR</div>

          <div>
            <button
              onClick={() => navigate(forStudent ? "/login" : "/student-login")}
              className="relative overflow-hidden w-full bg-white border border-custom-red text-custom-red text-[1.9rem] font-bold leading-[160%] py-[1.941rem] rounded-[.9rem] text-center enabled:hover:opacity-70 duration-300 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              // disabled={!isValid || !dirty || loginUserData?.loading}
            >
              {`Login as ${forStudent ? "Teacher" : "Student"}`}
            </button>
            {/* </div> */}
          </div>
        </form>
      </div>
      {/* Right side with image */}
      <div className="flex-1 flex flex-col justify-center items-start bg-[#7A1315] relative">
        <img
          src="/login-logo.svg"
          alt="Background"
          className="pl-16 pb-5"
          //   className="max-w-full h-auto absolute left-14 top-5"
        />

        <div className="flex flex-col items-center">
          <div className=" flex flex-col px-60 py-5">
            <span className="font-bold text-white text-8xl">
              Welcome to Student Portal
            </span>

            <span className="text-white text-4xl pt-6">
              Login to access your account
            </span>
          </div>
          <img
            src="/student-login.svg"
            alt="Background"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
