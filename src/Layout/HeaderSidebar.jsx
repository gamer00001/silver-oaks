import { Header, SideBar } from "@/components/common";
import RightSideBar, {
  allowedPathsForRightSidebar,
} from "@/components/common/RightSideBar";
import { useGlobalContext } from "@/hooks";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const HeaderSidebar = () => {
  const [state, setState] = useState({
    isOpen: false,
  });

  const handleRightSidebar = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const { pathname } = useLocation();

  const userRole = localStorage.getItem("userType");

  return (
    <div className="min-h-screen">
      <WithResponsiveSidebar>
        <SideBar />
      </WithResponsiveSidebar>
      <div
        className={`lg:pl-[28.5rem] ${
          allowedPathsForRightSidebar()?.includes(pathname) &&
          state.isOpen &&
          "lg:pr-[35.5rem]"
        } min-h-screen ${
          userRole === "admin" ? "bg-white" : "bg-[#edf0f3]"
        } scrollbar`}
      >
        <div className="mx-auto grid grid-cols-1 gap-[1.5rem]">
          <div
            className={`sticky lg:hidden top-0 py-[2.3rem] px-[1.6rem] ${
              userRole === "admin" ? "bg-white" : "bg-[#edf0f3]"
            } z-40`}
          >
            <Header isOpen={state.isOpen} setIsOpen={handleRightSidebar} />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      {state.isOpen &&
        (allowedPathsForRightSidebar()?.includes(pathname) ||
          pathname.includes("/course") ||
          pathname.includes("/enrolled-courses")) && (
          <WithResponsiveRightSidebar>
            <RightSideBar />
          </WithResponsiveRightSidebar>
        )}
    </div>
  );
};

export default HeaderSidebar;

const WithResponsiveSidebar = ({ children }) => {
  const { isNotLargeScreen, isSidebarOpen, setIsSidebarOpen } =
    useGlobalContext();

  return isNotLargeScreen ? (
    <div className="overflow-x-hidden overflow-y-auto w-[28.5rem] fixed top-0 left-0 bottom-0 z-50 scrollbar bg-custom-red bg-[url('assets/Login/BgLogin.png')] bg-repeat bg-cover border-r border-r-black/5">
      {children}
    </div>
  ) : (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#7A1315",
          color: "#7A1315",
        },
      }}
    >
      <div className="overflow-x-hidden overflow-y-auto w-[28.5rem] border-r border-r-black/5">
        {children}
      </div>
    </Drawer>
  );
};

export const WithResponsiveRightSidebar = ({ children }) => {
  const { isNotLargeScreen, isRightSidebarOpen, setIsRightSidebarOpen } =
    useGlobalContext();

  return isNotLargeScreen ? (
    <div className="overflow-x-hidden overflow-y-auto w-[35.5rem] fixed top-0 right-0 bottom-0 z-50 scrollbar bg-white bg-repeat bg-cover border-r border-r-black/5">
      {children}
    </div>
  ) : (
    <Drawer
      anchor="right"
      open={isRightSidebarOpen}
      // open={true}
      onClose={() => setIsRightSidebarOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#FFFFFF",
          color: "#7A1315",
        },
      }}
    >
      <div className="overflow-x-hidden overflow-y-auto w-[28.5rem] border-r border-r-black/5">
        {children}
      </div>
    </Drawer>
  );
};
