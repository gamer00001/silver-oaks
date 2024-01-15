import CourseCard from "@/components/common/CourseCard";
import React from "react";
import Grade1 from "@/assets/common/grade1.png";
import Grade2 from "@/assets/common/grade2.png";
import Grade3 from "@/assets/common/grade3.png";

const MyCourses = () => {
  const courses = [
    {
      id: "43657457",
      title: "Grade 1(Alliums)",
      img: Grade1,
      location: "Campus 1_Faraz(Rawalpindi)",
    },
    {
      id: "43635654",
      title: "Grade 2(Alliums)",
      img: Grade2,
      location: "Campus 1_Faraz(Rawalpindi)",
    },
    {
      id: "43645776",
      title: "Grade 3(Alliums)",
      img: Grade3,
      location: "Campus 1_Faraz(Rawalpindi)",
    },
  ];

  return (
    <div>
      <div className="grid gap-[1.6rem] px-[1.7rem]">
        <h1 className="h5-bold text-custom-dark-gren">Courses</h1>
      </div>
      <div className="flex flex-row flex-wrap">
        {courses.map((course, index) => (
          <CourseCard
            id={course.id}
            title={course.title}
            img={course.img}
            location={course.location}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
