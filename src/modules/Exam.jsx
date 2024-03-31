import React, { useEffect, useState } from "react";
import gradeImg from "@/assets/common/grade1.png";
import { CardContent } from "@mui/material";
import MUICard from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import LectureIcon from "@/assets/Icons/LectureIcon";
import PlayIcon from "@/assets/Icons/PlayIcon";
import MenuIcon from "@/assets/Icons/MenuIcon";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Invisible from "@/assets/Icons/Invisible";
import Visible from "@/assets/Icons/Visible";
import { getAssesments } from "@/store/actions/assesmentActions";
import { Loader } from "@/components/common";
import CourseBlock from "@/components/common/CourseBlock";
import { fetchSelectedCourseInfo } from "@/utils/helper";

const Exam = ({ forStudent = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { assesmentsData } = useSelector((s) => s.assesmentReducer);

  const [course, setCourse] = useState(null)

  const { coursesData } = useSelector((s) => s.courseReducer);

  const findCourseById = () => {
    const foundCourse = coursesData?.data?.courseList?.find(
      (course) => course.courseId == id
    );
    setCourse(foundCourse);
  };

  useEffect(() => {
    forStudent && findCourseById()
    dispatch(
      getAssesments({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId: id,
            studentRollNumber: localStorage.getItem("email"),
          },
        },
      })
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      {assesmentsData.loading && <Loader type="screen" />}
      {forStudent ? (
        <CourseBlock
          bookIcon="w-72"
          width="w-5/6"
          height="h-96"
          titleFontSize="text-7xl"
          headingFontSize="text-4xl"
          title={course?.courseName}
          heading={course?.grade}
          textColor={fetchSelectedCourseInfo()?.textColor}
          bgColor={fetchSelectedCourseInfo()?.backgroundColor}
        />
      ) : (
        <img src={gradeImg} className="w-5/6 rounded-[2rem]" />
      )}
      {assesmentsData?.data?.examList?.map((item, k) => (
        <div className="w-5/6" key={k}>
          <ExamCard
            examNo={k + 1}
            e_id={item?.examId}
            title={item?.examTitle ?? item?.title}
            attempts={23}
            total={26}
            // file={item?.file}
            forStudent={forStudent}
          />
        </div>
      ))}
    </div>
  );
};

export default Exam;

const ExamCard = ({
  e_id,
  examNo,
  title,
  attempts,
  total,
  file,
  forStudent,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [menu, setIsMenu] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div class="flex justify-between items-start ">
          <div className="grid grid-col-2 gap-4 px-[1.9rem]">
            <div className="flex flex-row justify-center items-center gap-4">
              <LectureIcon />
              {!forStudent && (
                <NavLink>
                  <span
                    className="ml-auto"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "▼" : "▲"}
                  </span>
                </NavLink>
              )}
              <h1 className="font-extrabold text-[1.5rem]">Exam {examNo}: </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
            <div className={`flex flex-row ${expanded ? "block" : "hidden"}`}>
              <h1 className="font-bold text-[1.5rem] text-custom-red">
                {attempts + " "} of {" " + total + " "} attempted
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end items-end">
            {!forStudent && (
              <div onClick={() => setIsMenu(!menu)}>
                <MenuIcon />
              </div>
            )}
            {menu && <VisibilityMenu />}
            {!forStudent && (
              <button
                className="text-custom-red font-bold text-[1.5rem]"
                onClick={() => window.open(file)} //navigate(`/course/${id}/assignment/${aid}`)}
              >
                View Assesment
              </button>
            )}
          </div>

          {forStudent && (
            <button
              className="text-custom-red font-bold text-[1.5rem]"
              // onClick={() => navigate(`/course/${id}/quizSummary/${qid}`)}
              onClick={() =>
                navigate(`/enrolled-courses/${id}/exam/${e_id ?? 1}`)
              }
            >
              Attempt
            </button>
          )}
        </div>
      </CardContent>
    </MUICard>
  );
};

const VisibilityMenu = () => {
  const items = [
    {
      title: "Invisible to Students",
      icon: <Invisible />,
    },
    {
      title: "Visible to Students",
      icon: <Visible />,
    },
  ];
  return (
    <div
      className="absolute -my-[6rem] mt-32 bg-white rounded-md shadow-lg overflow-hidden z-20"
      style={{ width: "28rem" }}
    >
      {items.map((item, k) => (
        <div className="py-2" key={k}>
          <NavLink className="flex flex-row justify-between items-center px-4 py-3 border-b hover:bg-[#FBBC05] -mx-2">
            <h1 className="text-gray-600 text-lg mx-2">
              <span className="font-bold">{item.title}</span>
            </h1>
            <div>{item.icon}</div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};
