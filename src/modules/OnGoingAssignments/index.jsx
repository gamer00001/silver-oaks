import React, { useEffect, useState } from "react";
import gradeImg from "@/assets/common/grade1.png";
import { CardContent } from "@mui/material";
import MUICard from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import LectureIcon from "@/assets/Icons/LectureIcon";

import { NavLink, useParams, useNavigate } from "react-router-dom";

import { Loader } from "@/components/common";
import CourseBlock from "@/components/common/CourseBlock";
import { fetchSelectedCourseInfo } from "@/utils/helper";

import { getOnGoingAssignmentsListing } from "@/store/actions/ogaActions";

const OnGoingAssignments = ({ forStudent = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { ogaListingData } = useSelector((s) => s.ogaReducer);

  const [course, setCourse] = useState(null);

  const { coursesData } = useSelector((s) => s.courseReducer);

  const findCourseById = () => {
    const foundCourse = coursesData?.data?.courseList?.find(
      (course) => course.courseId == id
    );
    setCourse(foundCourse);
  };

  useEffect(() => {
    forStudent && findCourseById();
    dispatch(
      getOnGoingAssignmentsListing({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId: id,
            studentRollNumber: localStorage.getItem("email"),
          },
          dispatch,
        },
      })
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      {ogaListingData.loading && <Loader type="screen" />}

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

      {ogaListingData?.data?.ogaList?.map((item, k) => (
        <div className="w-5/6">
          <QuizCard
            id={id}
            key={k + "_id_"}
            aid={item?.ogaId}
            assignmentNo={k + 1}
            title={item?.ogaTitle}
            forStudent={forStudent}
          />
        </div>
      ))}
    </div>
  );
};

export default OnGoingAssignments;

const QuizCard = ({ assignmentNo, title, id, forStudent, aid }) => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div class="flex justify-between items-center ">
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
              <h1 className="font-extrabold text-[1.5rem]">
                Assesment {assignmentNo}:{" "}
              </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
          </div>

          {forStudent && (
            <button
              className="text-custom-red font-bold text-[1.5rem]"
              // onClick={() => navigate(`/course/${id}/quizSummary/${qid}`)}
              onClick={() =>
                navigate(
                  `/enrolled-courses/${id}/on-going-assesments/${aid ?? 1}`
                )
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
