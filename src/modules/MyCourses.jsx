import CourseCard from "@/components/common/CourseCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "@/store/actions/coursesActions";
import { Loader } from "@/components/common";
import { currentLoggedInUserType } from "@/utils/helper";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((s) => s.courseReducer);
  const { studentCourses, teacherCourses } = useSelector(
    (s) => s.courseReducer
  );

  useEffect(() => {
    dispatch(
      getCourses({
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, []);

  return (
    <div>
      {coursesData.loading && <Loader type="screen" />}
      <div className="grid gap-[1.6rem] px-[1.7rem]">
        <h1 className="h5-bold text-custom-dark-gren">Courses</h1>
      </div>
      <div className="flex flex-row flex-wrap w-full">
        {(currentLoggedInUserType() === "student"
          ? studentCourses
          : currentLoggedInUserType() === "teacher"
          ? teacherCourses
          : coursesData
        ).data?.courseList?.map((course, index) => (
          <CourseCard
            id={course.courseId}
            title={course.courseName}
            grade={course.grade}
            location={"Campus 1_Faraz(Rawalpindi)"}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
