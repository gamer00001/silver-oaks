import { Avatar, Logo } from "@/assets/common";
import { CONSTANTS } from "@/constants";
import { panelSideBar } from "@/constants/sidebarMenus";
import { useGlobalContext } from "@/hooks";
import {
  getCourses,
  getCoursesByStudent,
} from "@/store/actions/coursesActions";
import { fetchCompusListing } from "@/utils/common-api-helper";
import {
  currentLoggedInUserType,
  fetchCurrentUserInfo,
  isCurrentUserStudent,
} from "@/utils/helper";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Link, NavLink } from ".";

const SideBar = () => {
  const {
    loginUserData: { user, userDetail },
  } = useSelector((s) => s.authReducer);

  const { campusesData } = useSelector((s) => s.commonReducer);

  const userInfo = fetchCurrentUserInfo();

  // const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const apiToCall = isCurrentUserStudent() ? getCoursesByStudent : getCourses;

    if (!isEmpty(userInfo)) {
      dispatch(
        apiToCall({
          payload: {
            query: {
              studentId: userInfo?.studentId,
            },
          },
          onError: () => navigate("/404", { replace: true }),
          onSuccess: (res) => {
            const coursesList =
              res?.courseList?.map((item) => item?.courseId) ?? [];
            localStorage.setItem("coursesList", coursesList ?? []);
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    fetchCompusListing(dispatch);
  }, []);

  const sidebarMenus = panelSideBar(
    campusesData?.data ? campusesData?.data[0] : {}
  )[currentLoggedInUserType()];

  return (
    <aside className="py-[2.8rem] grid grid-cols-1 content-start gap-[3.2rem]">
      <div className="px-[1.9rem]">
        <Link to="/" className="outline-custom-button-color">
          <img className="w-[12rem]" src={Logo} alt="Silver Oaks Icon" />
        </Link>
      </div>
      <div className="flex flex-row gap-4 px-[1.9rem]">
        <img
          className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
          src={
            user?.profile_image
              ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${user?.profile_image}`
              : Avatar
          }
          alt="Admin"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        />
        <span
          onClick={(e) => setAnchorEl(e.currentTarget)}
          className="body-medium !font-semiboldcapitalize max-w-[20rem] capitalize overflow-hidden text-ellipsis whitespace-nowrap text-white py-[1rem]"
        >
          {userDetail?.employeeName ??
            userDetail?.studentName ??
            currentLoggedInUserType()}
        </span>
      </div>
      <div className="gap-16 border-b-2 border-gray-100 ml-12 mr-12" />
      <nav>
        <ul className="grid gap-[.5rem] grid-cols-1 items-start px-[1.9rem] md:px-0">
          {sidebarMenus.map((route, index) => (
            <SideBarItem key={index} route={route} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;

const SideBarItem = ({ route }) => {
  const { setIsSidebarOpen } = useGlobalContext();
  const [expanded, setExpanded] = useState(false);
  const { coursesData } = useSelector((s) => s.courseReducer);
  const { studentCourses } = useSelector((s) => s.courseReducer);

  const { pathname } = useLocation();

  const handleItemClick = () => {
    setIsSidebarOpen(false);
    if (route.name === "My Courses") {
      setExpanded(!expanded);
    }
  };

  return (
    <li className="grid grid-cols-1">
      {route.courses ? (
        <div>
          <div
            className={`py-[1.5rem] px-[3rem] grid grid-cols-[auto_auto_auto] gap-[1.6rem] items-center justify-start text-white hover:text-custom-golden cursor-pointer transition duration-300 ${
              expanded ? "" : ""
            }`}
            onClick={handleItemClick}
          >
            <NavLink
              className={({ isActive }) =>
                `grid grid-cols-[auto_auto] gap-[1.6rem] items-center justify-start ${
                  isActive
                    ? "text-custom-golden"
                    : "text-white hover:text-custom-golden transition-colors duration-300"
                }`
              }
              onClick={handleItemClick}
              to={route.to}
            >
              <span className="text-[2.4rem] center">{route.icon}</span>
              <span className="body-medium">{route.name}</span>
            </NavLink>
            <span className="ml-auto">{expanded ? "▲" : "▼"}</span>
          </div>
          <ul
            className={`ml-[2rem] ${
              expanded || route?.courses
                ? "block max-h-auto overflow-hidden transition-all duration-300"
                : "hidden max-h-0"
            }`}
          >
            {currentLoggedInUserType() === "admin" ? (
              <>
                {route.courses.map((item, index) => (
                  <li className="px-[2.9rem] py-3 md:px-0 " key={index}>
                    <NavLink
                      className={({ isActive }) =>
                        `grid grid-cols-[auto_auto] gap-[1.6rem] items-center justify-start ${
                          isActive
                            ? "text-custom-golden"
                            : "text-white hover:text-custom-golden transition-colors duration-300"
                        }`
                      }
                      to={`${item.route}`}
                    >
                      <span
                        className={`md:pl-24  body-medium hover:text-custom-golden ${
                          pathname === item.route
                            ? "text-custom-golden"
                            : "text-white"
                        }`}
                      >
                        {item.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </>
            ) : (
              coursesData?.data?.courseList?.map((course, index) => (
                <li className="px-[2.9rem] md:px-0 " key={index}>
                  <NavLink
                    to={`/${
                      currentLoggedInUserType() === "student"
                        ? `enrolled-courses/${course.courseName}/${course.courseId}`
                        : "course"
                    }/lectures/${course.courseId}`}
                  >
                    <span
                      className={`md:pl-24  body-medium hover:text-custom-golden ${
                        pathname.includes(course.courseId)
                          ? "text-custom-golden"
                          : "text-white"
                      }`}
                    >
                      {course.courseName}
                    </span>
                  </NavLink>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : (
        <NavLink
          className={({ isActive }) =>
            `py-[1.5rem] px-[3rem] grid grid-cols-[auto_auto] gap-[1.6rem] items-center justify-start ${
              isActive
                ? "text-custom-golden"
                : "text-white hover:text-custom-golden transition-colors duration-300"
            }`
          }
          onClick={handleItemClick}
          to={route.to}
        >
          <span className="text-[2.4rem] center">{route.icon}</span>
          <span className="body-medium">{route.name}</span>
        </NavLink>
      )}
    </li>
  );
};
