import { Header, SideBar } from "@/components/common";
import RightSideBar, { allowedPathsForRightSidebar } from "@/components/common/RightSideBar";
import { useGlobalContext } from "@/hooks";
import { Drawer } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const HeaderSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <WithResponsiveSidebar>
        <SideBar />
      </WithResponsiveSidebar>
      <div className={`lg:pl-[28.5rem] ${allowedPathsForRightSidebar.includes(pathname)&& 'lg:pr-[35.5rem]'} min-h-screen bg-[#edf0f3] scrollbar`}>
        <div className="mx-auto grid grid-cols-1 gap-[1.5rem]">
          <div className="sticky lg:hidden top-0 py-[2.3rem] px-[1.6rem] bg-[#edf0f3] z-40">
            <Header />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      {(allowedPathsForRightSidebar.includes(pathname) || pathname.includes('/course')) &&
      <WithResponsiveRightSidebar>
        <RightSideBar />
      </WithResponsiveRightSidebar>
      }
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
        }
      }}
    >
      <div className="overflow-x-hidden overflow-y-auto w-[28.5rem] border-r border-r-black/5">
        {children}
      </div>
    </Drawer>
  );
};


const WithResponsiveRightSidebar = ({ children }) => {
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
      onClose={() => setIsRightSidebarOpen(false)}
      PaperProps={{
        sx: {
          backgroundColor: "#FFFFFF",
          color: "#7A1315",
        }
      }}
    >
      <div className="overflow-x-hidden overflow-y-auto w-[28.5rem] border-r border-r-black/5">
        {children}
      </div>
    </Drawer>
  );
};
