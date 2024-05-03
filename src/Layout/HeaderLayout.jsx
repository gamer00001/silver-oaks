import { Header } from "@/components/common";
import RightSideBar, {
  allowedPathsForRightSidebar,
} from "@/components/common/RightSideBar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { WithResponsiveRightSidebar } from "./HeaderSidebar";

const HeaderLayout = () => {
  const userRole = localStorage.getItem("userType");
  const { pathname } = useLocation();

  const [state, setState] = useState({
    isOpen: false,
  });

  const handleRightSidebar = (value) => {
    setState((prev) => ({
      ...prev,
      isOpen: typeof value === "boolean" ? value : !prev.isOpen,
    }));
  };

  useEffect(() => {
    pathname === "/" && handleRightSidebar(false);
  }, [pathname]);

  return (
    <div className="mx-auto grid grid-cols-1 gap-[1.5rem]">
      <div
        className={`sticky hidden lg:grid grid-cols-1 top-0 py-[2.3rem] px-[1.6rem] ${
          userRole === "admin" ? "bg-white" : "bg-[#edf0f3]"
        } z-40`}
      >
        <Header isOpen={state.isOpen} setIsOpen={handleRightSidebar} />

        {/* <Header /> */}
      </div>
      <div>
        <Outlet />
      </div>

      {state.isOpen &&
        (allowedPathsForRightSidebar()?.includes(pathname) ||
          pathname.includes("/course") ||
          pathname.includes("/enrolled-courses")) && (
          <WithResponsiveRightSidebar>
            <RightSideBar handleSidebar={handleRightSidebar} />
          </WithResponsiveRightSidebar>
        )}
    </div>
  );
};

export default HeaderLayout;
