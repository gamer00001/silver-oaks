import React, { useEffect, useState } from "react";
import gradeImg from "@/assets/common/grade1.png";
import { CardContent, Switch, ToggleButton } from "@mui/material";
import MUICard from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import LectureIcon from "@/assets/Icons/LectureIcon";
import PlayIcon from "@/assets/Icons/PlayIcon";
import MenuIcon from "@/assets/Icons/MenuIcon";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import Invisible from "@/assets/Icons/Invisible";
import Visible from "@/assets/Icons/Visible";
import { Avatar } from "@/assets/common";
import { Loader, ModalTop } from "@/components/common";
import Warning from "@/assets/Icons/Warning";
import {
  changeLectureStatus,
  getLectures,
} from "@/store/actions/lecturesActions";
import CourseBlock from "@/components/common/CourseBlock";
import { fetchSelectedCourseInfo } from "@/utils/helper";
import { courseReducer } from "@/store";

const Lectures = ({ forStudent = false, courseInfo }) => {
  // debugger
  const { id } = useParams();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const { lecturesData, lectureStatusData } = useSelector(
    (s) => s.lectureReducer
  );

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
      getLectures({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            courseId: id,
          },
          dispatch,
        },
      })
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      {(lecturesData.loading || lectureStatusData.loading) && (
        <Loader type="screen" />
      )}
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

      {!forStudent && (
        <div className="w-5/6">
          <Post />
        </div>
      )}

      {lecturesData?.data?.lectureList?.map((item, k) => (
        <div className="w-5/6" key={k}>
          <LectureCard
            key={k + "_lecture"}
            lid={item?.lectureId}
            lectureNo={k + 1}
            title={item?.lectureTitle}
            link={item?.videoURL || item?.powerPointURL}
            status={!item?.visible}
            forStudent={forStudent}
          />
        </div>
      ))}
    </div>
  );
};

export default Lectures;

const Post = () => {
  const {
    loginUserData: { user },
  } = useSelector((s) => s.authReducer);
  const [canPost, setCanPost] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (text.length > 0) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [text]);

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div>
          <div className="flex flex-row h-[6rem] px-[1.9rem] justify-between items-center">
            <div className="flex gap-4">
              <img
                className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
                src={
                  user?.profile_image
                    ? `${CONSTANTS.VITE_BACKEND_STATIC_URL}/${user?.profile_image}`
                    : Avatar
                }
                alt="Admin"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
              <input
                type="text"
                placeholder="Announce something to the class"
                className="bg-[#F6F5F5] rounded-[1rem] h-[4rem] text-[2rem] w-[34rem] "
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div
              className={`flex flex-col gap-2 ${canPost ? "block" : "hidden"}`}
            >
              <input
                type="submit"
                value={"Post"}
                className="bg-custom-red text-white rounded-[2rem] w-[8rem] h-[3rem]"
              />
              <button className="h-[3rem] border-[0.1rem] rounded-[2rem] border-custom-red">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </MUICard>
  );
};

const LectureCard = ({ lid, lectureNo, title, link, status, forStudent }) => {
  const [expanded, setExpanded] = useState(false);
  const [menu, setIsMenu] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [warning, setWarning] = useState(false);
  const [checked, setChecked] = useState(status);
  const dispatch = useDispatch();

  return (
    <MUICard style={{ backgroundColor: "#F6F5F5", borderRadius: "1rem" }}>
      <CardContent>
        <div class="flex justify-between items-start ">
          <div className="grid grid-col-2 gap-4 px-[1.9rem]">
            <div className="flex flex-row justify-center items-center gap-4">
              <LectureIcon />
              <NavLink>
                <span
                  className="ml-auto"
                  onClick={() => setExpanded(!expanded)}
                >
                  {/* {expanded ? "▼" : "▲"} */}
                </span>
              </NavLink>
              <h1 className="font-extrabold text-[1.5rem]">
                Lecture {lectureNo}:{" "}
              </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
            <div
              className={`flex flex-row cursor-pointer`}
              onClick={() => window.open(link)}
            >
              <PlayIcon />
              {/* {expanded && ( */}
              <h1 className="font-bold text-[1.5rem] text-custom-red">
                {title}
              </h1>
              {/* )} */}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end items-end">
            {/* <div onClick={() => setIsMenu(!menu)}>
              <MenuIcon />
            </div> */}
            {!forStudent && (
              <Switch
                color="error"
                checked={checked}
                onChange={() => setWarning(true)}
              />
            )}
            <button
              className="text-[2rem] font-semibold text-custom-red"
              onClick={() =>
                forStudent
                  ? window.open(link)
                  : navigate(
                      `/${
                        forStudent ? "enrolled-courses" : "course"
                      }/${id}/lectures/${lid}`
                    )
              }
            >
              {forStudent ? "View" : "Reports"}
            </button>
          </div>
        </div>
      </CardContent>
      <ModalTop
        onClose={() => setWarning(false)}
        open={warning}
        className="bg-white flex flex-col justify-center items-center p-8 gap-4"
      >
        <Warning />
        <h1 className="text-[1.5rem] text-red-800">Alert</h1>
        <h1 className="text-[2rem]">
          Are you sure you want to change the visibility of this lecture from
          students?
        </h1>
        <button
          className="bg-custom-red pl-8 pr-8 pt-4 pb-4 w-96 rounded-xl text-[2rem] text-white hover:opcaity-70"
          onClick={() => {
            setWarning(false);
            dispatch(
              changeLectureStatus({
                onError: () => navigate("/404", { replace: true }),
                onSuccess: () =>
                  dispatch(
                    getLectures({
                      onError: () => navigate("/404", { replace: true }),
                      payload: {
                        query: {
                          courseId: id,
                        },
                      },
                    })
                  ),
                payload: {
                  query: {
                    courseId: id,
                    status: false,
                  },
                },
              })
            );
          }}
        >
          Hide
        </button>
        <button
          className="bg-white pl-8 pr-8 pt-4 pb-4 w-96 rounded-xl text-[2rem] text-black border border-solid border-black hover:opcaity-70"
          onClick={() => {
            setWarning(false);
            dispatch(
              changeLectureStatus({
                onError: () => navigate("/404", { replace: true }),
                onSuccess: () =>
                  dispatch(
                    getLectures({
                      onError: () => navigate("/404", { replace: true }),
                      payload: {
                        query: {
                          courseId: id,
                        },
                      },
                    })
                  ),
                payload: {
                  query: {
                    courseId: id,
                    status: true,
                  },
                },
              })
            );
          }}
        >
          Unhide
        </button>
      </ModalTop>
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
