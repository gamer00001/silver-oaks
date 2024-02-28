import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseBlock from "@/components/common/CourseBlock";
import { getCourses } from "@/store/actions/coursesActions";
import { CoursesColors } from "@/utils/helper";
import { Loader } from "@/components/common";

const coursesList = [
  {
    heading: "Grade 1",
    title: "English",
    bgColor: "#0BF4C8",
    link: "/enrolled-courses/lectures/1",
  },
  {
    heading: "Grade 1",
    title: "Science",
    bgColor: "#FAD85D",
    textColor: "#fff",
    link: "",
  },
  {
    heading: "Grade 1",
    title: "Maths",
    bgColor: "#0C7E40",
    textColor: "#fff",
    link: "",
  },
  {
    heading: "Grade 1",
    title: "Urdu",
    bgColor: "#7A1317",
    textColor: "#fff",
    link: "",
  },
  {
    heading: "Grade 1",
    title: "Islamiat",
    bgColor: "#FAD85D",
    textColor: "#fff",
    link: "",
  },
  {
    heading: "Grade 1",
    title: "Computer",
    bgColor: "#0C7E40",
    textColor: "#fff",
    link: "",
  },
];

const EnrolledCourses = () => {
  const dispatch = useDispatch();

  const {
    coursesData: { data, loading },
  } = useSelector((s) => s.courseReducer);

  useEffect(() => {
    dispatch(
      getCourses({
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, []);

  if (loading) {
    return <Loader type="screen" />;
  }

  return (
    <div className="pl-20">
      <span className="text-black font-bold text-4xl">My Courses</span>
      <div className="flex gap-12 pt-12 flex-wrap ">
        {data?.courseList?.map((item, index) => (
          <CourseBlock
            key={index}
            width="w-5/12"
            height="h-72"
            bookIcon="w-40"
            titleFontSize="text-7xl"
            headingFontSize="text-2xl"
            data={CoursesColors[index]}
            link={`/enrolled-courses/lectures/${item?.courseId}`}
            bgColor={CoursesColors[index]?.backgroundColor}
            textColor={CoursesColors[index]?.textColor}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
