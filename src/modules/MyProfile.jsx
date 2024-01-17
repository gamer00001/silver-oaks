import { Avatar } from "@/assets/common";
import { Link, MyInput } from "@/components/common";
import { CONSTANTS } from "@/constants";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const {
    loginUserData: { user },
  } = useSelector((s) => s.authReducer);

  return (
    <div className="min-h-[calc(100vh_-_10.4rem)] lg:min-h-screen px-[2rem] pb-[2.4rem] lg:pt-[2.4rem]">
      <div className="bg-white min-h-[calc(100vh_-_15.2rem)] lg:min-h-[calc(100vh_-_4.8rem)] p-[2.5rem_2.4rem_5rem]">
        <div className="grid gap-[3.3rem] content-start max-w-[1240px]">
          <div className="grid gap-[2.6rem] items-start border-b border-[#E0E4EC] pb-[4rem]">
            <h1 className="text-[3.2rem] leading-[120%] font-bold text-black">
              My Profile
            </h1>
            <div className="grid gap-[1.3rem]">
              <label
                className="justify-self-start text-[#4C535F] font-medium text-[1.56rem]"
                htmlFor="profilePic"
              >
                Your Profile Picture
              </label>
              <div className="w-[12.7rem] h-[12.7rem] rounded-[1.7rem]">
                <img
                  className="w-full h-full object-cover rounded-[1.7rem]"
                  src={
                    user?.profile_image
                      ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${user?.profile_image}`
                      : Avatar
                  }
                  alt={user?.name || "--"}
                  id="profilePic"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-[7.3rem] items-start">
            <div className="grid gap-[2.35rem] grid-cols-12">
              <MyInput
                type="text"
                label="Full Name"
                disabled
                value={user?.name || "--"}
                className="col-span-12 sm:col-span-6"
              />
              <MyInput
                type="text"
                label="Email"
                disabled
                value={user?.email || "--"}
                className="col-span-12 sm:col-span-6"
              />
              <MyInput
                type="text"
                label="User Name"
                disabled
                value={user?.username || "--"}
                className="col-span-12 sm:col-span-6"
              />
              <MyInput
                type="phone"
                label="Phone number"
                disabled
                value={user?.phone || "--"}
                className="col-span-12 sm:col-span-6"
              />
               <MyInput
                type="id"
                label="ID"
                value={user?.id || "--"}
                className="col-span-12 sm:col-span-6"
              />
              <MyInput
                type="textarea"
                label="Bio"
                disabled
                value={user?.about || "--"}
                className="col-span-12"
              />
            </div>
            <div className="grid justify-start content-start gap-[1.6rem] grid-cols-[auto_auto]">
              <Link
                className="p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-transparent text-custom-dark-gren bg-custom-button-color opacity"
                to="/my-profile/edit"
              >
                Edit Profile
              </Link>
              <Link
                className="p-[1.2rem_3.4rem] rounded-[.7rem] text-[1.7rem] font-bold border border-[#39555657] text-[#1A1B25] opacity"
                to="/my-profile/change-password"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
