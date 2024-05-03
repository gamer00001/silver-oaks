import { useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Notifications from "@/assets/Icons/Notifications";
import NotificationsBing from "@/assets/Icons/NotificationsBing";
import { MyMenu } from "../common";
import { Avatar } from "@/assets/common";

const UserProfile = ({ setIsOpen }) => {
  const {
    loginUserData: { user },
  } = useSelector((s) => s.authReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const { pathname } = useLocation();

  const [isNotification, setIsNotification] = useState(false);

  return (
    <>
      <div className="grid gap-[2.7rem] grid-cols-[auto_auto] items-center justify-between cursor-pointer">
        {pathname === "/" ? (
          <NavLink to={"/notifications"}>
            <span
              // onClick={(e) => setAnchorEl(e.currentTarget)}
              className="body-medium !font-semibold text-black capitalize max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {isNotification ? <NotificationsBing /> : <Notifications />}
            </span>
          </NavLink>
        ) : (
          <div onClick={setIsOpen}>
            {isNotification ? <NotificationsBing /> : <Notifications />}
          </div>
        )}

        <img
          className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover"
          src={
            user?.profile_image
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${user?.profile_image}`
              : Avatar
          }
          alt="Admin"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        />
      </div>

      <MyMenu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="[&_>_div_>_ul]:bg-white [&_>_div_>_ul]:p-[1.2rem] [&_>_div_>_ul]:gap-[1rem]"
      >
        {dropdownitems.map((item, k) => (
          <ProfileDropDownItem
            key={k}
            item={item}
            onClick={() => setAnchorEl(null)}
          />
        ))}
      </MyMenu>
    </>
  );
};

export default UserProfile;

const dropdownitems = [
  { to: "/my-profile", text: "My Profile" },
  { to: "/logout", text: "Logout" },
];

const ProfileDropDownItem = ({ item, onClick }) => {
  return (
    <li className="grid grid-cols-1">
      <NavLink
        className="text-[#395556] text-[1.3rem] font-medium leading-[120%] opacity"
        to={item.to}
        onClick={onClick}
      >
        {item.text}
      </NavLink>
    </li>
  );
};
