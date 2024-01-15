import { Header } from "@/components/common";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-[1.5rem]">
      <div className="sticky hidden lg:grid grid-cols-1 top-0 py-[2.3rem] px-[1.6rem] bg-[#edf0f3] z-40">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;
