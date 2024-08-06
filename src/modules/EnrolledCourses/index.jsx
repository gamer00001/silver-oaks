import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseBlock from "@/components/common/CourseBlock";
import { getCourses } from "@/store/actions/coursesActions";
import { CoursesColors } from "@/utils/helper";
import { Loader } from "@/components/common";

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
      <div className="flex gap-12 pt-12 flex-wrap">
        {data?.courseList?.map((item, index) => {
          const colorIndex = index % CoursesColors.length;
          return (
            <CourseBlock
              key={index}
              width="w-5/12"
              height="h-72"
              bookIcon="w-40"
              titleFontSize="text-5xl"
              headingFontSize="text-2xl"
              title={item?.courseName}
              heading={item?.grade}
              data={CoursesColors[colorIndex]}
              link={`/enrolled-courses/lectures/${item?.courseId}`}
              bgColor={CoursesColors[colorIndex]?.backgroundColor}
              textColor={CoursesColors[colorIndex]?.textColor}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;
