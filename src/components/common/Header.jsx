// import { useFormik } from "formik";
import { NavLink, MyInput, Link } from ".";
import { Avatar, Logo } from "@/assets/common";
import { useGlobalContext, useQueryParams } from "@/hooks";
import { useLocation, useNavigate } from "react-router-dom";
// import { convertObjectToQueryString, scrollToTop } from "@/utils";
// import { useState } from "react";
// import MyMenu from "./MyMenu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
// import { SearchOutline } from "@/assets/Icons";
// import { useSelector } from "react-redux";
// import { CONSTANTS } from "@/constants";
// import Notifications from "@/assets/Icons/Notifications";
// import NotificationsBing from "@/assets/Icons/NotificationsBing";
import UserProfile from "../Header/UserProfile";
import { allowedPathsForRightSidebar } from "./RightSideBar";
import SearchForm from "./SearchForm";
import { isCurrentUserStudent } from "@/utils/helper";

const allowedPathsForSearch = [
  "/downloads",
  "/notifications",
  "/my-courses",
  "/blogs",
  "/tours",
  "/subscribers",
  "/destinations",
  "/payment-gateway",
  "/applications/tailor-made-tours",
  "/applications/group-tours",
  "/applications/couple-tours",
  "/applications/plan-my-trip",
  "/applications/contact-us",
  "/applications/invitation-letter",
];

const headerTitlesForAdmin = [
  {
    title: "Dashboard",
    route: "/",
  },
  {
    title: "Manage Students",
    route: "/manage-students",
  },
  {
    title: "Manage Teachers",
    route: "/manage-teachers",
  },
  {
    title: "Manage Announcements",
    route: "/manage-announcements",
  },
  {
    title: "Manage Notifications",
    route: "/manage-notifications",
  },
  {
    title: "All Classes",
    route: "/all-classes",
  },
];

const Header = ({ isOpen, setIsOpen }) => {
  const { setIsSidebarOpen, setIsRightSidebarOpen, isNotLargeScreen } =
    useGlobalContext();
  const { pathname } = useLocation();

  return (
    <header className="h-full grid grid-cols-[1fr_auto] items-center justify-between">
      <div className="hidden lg:block">
        {allowedPathsForSearch.includes(pathname) && <SearchForm />}
        {isCurrentUserStudent() && pathname === "/" ? (
          <span className="text-5xl text-black font-semibold">
            Welcome Back to your Student Portal
          </span>
        ) : (
          <span className="text-5xl text-black font-semibold">
            {headerTitlesForAdmin.find((item) => item.route === pathname)
              ?.title ?? ""}
          </span>
        )}
      </div>

      <div className="grid lg:hidden grid-cols-[auto_auto] justify-start gap-[1.5rem]">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="grid-center text-[3rem] hover:opacity-70 duration-300 transition-opacity"
        >
          <HiOutlineMenuAlt2 />
        </button>
        <Link to="/" className="outline-custom-button-color">
          <img className="w-[6.9rem]" src={Logo} alt="Falcon Club Admin" />
        </Link>
      </div>
      <div className="grid grid-cols-[auto_auto_auto] lg:grid-cols-[auto] items-center justify-end gap-[2.5rem]">
        {allowedPathsForSearch.includes(pathname) && !isNotLargeScreen && (
          <SearchForm />
        )}
        {/* {!allowedPathsForRightSidebar()?.includes(pathname) && (
          <UserProfile setIsOpen={setIsOpen} />
        )} */}

        {/* {<UserProfile setIsOpen={setIsOpen} />} */}

        {!isOpen && <UserProfile setIsOpen={setIsOpen} />}

        <div className="grid lg:hidden grid-cols-[auto_auto] justify-start gap-[1.5rem]"></div>
        <button
          onClick={() => setIsRightSidebarOpen(true)}
          className="grid-center text-[3rem] hover:opacity-70 duration-300 transition-opacity"
        >
          <HiOutlineMenuAlt2
            className={`${
              !allowedPathsForRightSidebar()?.includes(pathname) && "hidden"
            } lg:hidden`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
