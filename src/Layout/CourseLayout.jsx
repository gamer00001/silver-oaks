import { Header } from "@/components/common";
import CourseHeader from "@/components/common/CourseHeader";
import { Outlet } from "react-router-dom";

const CourseLayout = ({ tabs, forStudent }) => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-[1.5rem]">
      <div className="md:-mt-56 sticky lg:grid grid-cols-1 top-0 py-[2.3rem] px-[1.6rem] bg-[#edf0f3] z-40">
        <CourseHeader courseTabs={tabs} forStudent={forStudent} />
      </div>
      <div className="px-[1.9rem] lg:pr-[37.4rem]">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseLayout;
