import { Image, Link, Loader, MyInput } from "@/components/common";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { Close } from "@/assets/Icons";
import { useCallback } from "react";
import { editProfileSchema } from "@/schema";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import toast from "react-hot-toast";

const MyProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loginUserData: { user },
    updateProfileData,
  } = useSelector((s) => s.authReducer);
  const { imageUploadData } = useSelector((s) => s.uploadReducer);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    dirty,
    isValid,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: user?.name || "",
      about: user?.about || "",
      email: user?.email || "",
      username: user?.username || "",
      phone: user?.phone || "",
      image: user?.profile_image || null,
    },
    enableReinitialize: true,
    validationSchema: editProfileSchema,
    onSubmit: (values) => {
      const copy = { ...values };
      copy.profile_image = copy.image;
      delete copy.image;

      const f1 = () =>
       {

       }

      if (typeof copy.profile_image === "string") f1();
      else
       {
        
       }
    },
  });

  const handleImageChange = useCallback(
    (e) => {
      setFieldTouched("image", true);
      const file = e.target.files[0];
      file && setFieldValue("image", file);
    },
    [setFieldValue, setFieldTouched]
  );
  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.3rem] content-start max-w-[1240px]">
          <div className="grid gap-[2.6rem] items-start border-b border-[#E0E4EC] pb-[4rem]">
            <h1 className="text-[3.2rem] leading-[120%] font-bold text-black">
              Edit Profile
            </h1>
            <div className="grid gap-[1.3rem]">
              <label
                className="justify-self-start text-[#4C535F] font-medium text-[1.56rem]"
                htmlFor="profilePic"
              >
                Your Profile Picture
              </label>
              <div className="grid gap-[.5rem]">
                <div className="relative w-[12.7rem] h-[12.7rem] rounded-[1.7rem]">
                  <Image
                    className="w-full h-full object-cover rounded-[1.7rem]"
                    src={
                      typeof values.image === "string"
                        ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${values.image}`
                        : values.image
                    }
                    alt="John"
                    errorMessage="Select"
                  />
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    onBlur={handleBlur}
                    onChange={handleImageChange}
                    id="profilePic"
                  />
                  <label
                    className="z-[1] text-[5rem] text-custom-offwhite  absolute inset-0 grid-center bg-custom-black/50 rounded-[1.7rem] opacity-0 hover:opacity-100 duration-300 transition-opacity cursor-pointer"
                    htmlFor="profilePic"
                  >
                    <CiEdit />
                  </label>
                  <button
                    type="button"
                    className="z-[1] absolute top-[-.6rem] right-[-.55rem] text-[#ED4637] opacity text-[2.4rem]"
                    onClick={() => setFieldValue("image", null)}
                  >
                    <Close />
                  </button>
                </div>
                {touched.image && errors.image && (
                  <p className="text-red-500 caption">{errors.image}</p>
                )}
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-[7.3rem] items-start"
          >
            <div className="grid gap-[2.35rem] grid-cols-12 items-start">
              <MyInput
                type="text"
                label="Full Name"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                className="col-span-12 sm:col-span-6"
              />
              <MyInput
                type="text"
                label="Email"
                className="col-span-12 sm:col-span-6"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <MyInput
                type="text"
                label="username"
                className="col-span-12 sm:col-span-6"
                value={values.username}
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && errors.username}
              />
              <MyInput
                type="phone"
                label="Phone number"
                className="col-span-12 sm:col-span-6"
                value={values.phone}
                name="phone"
                onChange={(v) => setFieldValue("phone", v)}
                onBlur={handleBlur}
                error={touched.phone && errors.phone}
              />
              <MyInput
                type="textarea"
                label="about"
                className="col-span-12"
                value={values.about}
                name="about"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.about && errors.about}
              />
            </div>
            <div className="grid justify-start content-start gap-[1.6rem] grid-cols-[auto_auto]">
              <button
                className="overflow-hidden relative p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-transparent text-custom-dark-gren bg-custom-button-color opacity-button disabled:cursor-not-allowed disabled:opacity-50"
                disabled={
                  !isValid ||
                  !dirty ||
                  updateProfileData?.loading ||
                  imageUploadData?.loading
                }
                type="submit"
              >
                {(updateProfileData?.loading || imageUploadData?.loading) && (
                  <Loader type="button" />
                )}
                Update
              </button>
              <Link
                className="p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-[#39555657] text-[#1A1B25] opacity"
                to="/my-profile"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;
