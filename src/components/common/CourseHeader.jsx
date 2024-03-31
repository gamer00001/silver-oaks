import { GreenDot } from "@/assets/Icons";
import { TeacherCoursesTabs } from "@/constants/common";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

const CourseHeader = ({ courseTabs }) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { coursesData } = useSelector((s) => s.courseReducer);
  const [course, setCourse] = useState(null);
  const [state, setState] = useState({
    courseTabs: TeacherCoursesTabs ?? [],
  });

  const findCourseById = () => {
    const foundCourse = coursesData?.data?.courseList?.find(
      (course) => course.courseId == id
    );
    setCourse(foundCourse);
  };

  useEffect(() => {
    findCourseById();
    setState((prev) => ({
      ...prev,
      courseTabs: courseTabs ?? prev.courseTabs,
    }));
  }, []);

  return (
    <header>
      <div className="flex flex-row">
        <Link to={"/my-courses"}>
          <h1 className="body-medium mb-8 font-extrabold">My Courses {">"} </h1>
        </Link>
        <span className="body-regular">{course?.courseName}</span>
      </div>
      <div className="w-full flex flex-row flex-wrap body-regular md:body-medium md:pr-[36rem] gap-8 mb-4">
        {state.courseTabs?.map((item, k) => (
          <Link to={`/${item.baseRoute ?? "course"}/${item.to}/${id}`} key={k}>
            <h1
              key={k}
              className={`${
                pathname.includes(item.to.substring(1))
                  ? "text-gray-900"
                  : "text-gray-400"
              } hover:text-gray-900`}
            >
              {item.title}
            </h1>
            <div
              className={`${
                pathname.includes(item.to.substring(1)) ? "block" : "hidden"
              } flex justify-center items-center`}
            >
              <GreenDot />
            </div>
          </Link>
        ))}
      </div>
      <div className="gap-16 border-b-2 border-gray-500" />
    </header>
  );
};

export default CourseHeader;
