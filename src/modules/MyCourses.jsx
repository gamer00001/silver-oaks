import CourseCard from "@/components/common/CourseCard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "@/store/actions/coursesActions";
import { Loader } from "@/components/common";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((s) => s.courseReducer);

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
      <div className="flex flex-row flex-wrap">
        {coursesData.data?.courseList?.map((course, index) => (
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
