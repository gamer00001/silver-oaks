import React, { useEffect, useState } from "react";
import gradeImg from "@/assets/common/grade1.png";
import { Button, CardContent } from "@mui/material";
import MUICard from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANTS } from "@/constants";
import LectureIcon from "@/assets/Icons/LectureIcon";
import PlayIcon from "@/assets/Icons/PlayIcon";
import MenuIcon from "@/assets/Icons/MenuIcon";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Invisible from "@/assets/Icons/Invisible";
import Visible from "@/assets/Icons/Visible";
import {
  createAssignment,
  getAssignments,
  getAssignmentsByCourseId,
} from "@/store/actions/assignmentsActions";
import { Loader, ModalTop, MyInput } from "@/components/common";
import CourseBlock from "@/components/common/CourseBlock";
import { fetchSelectedCourseInfo } from "@/utils/helper";
import { getCourses } from "@/store/actions/coursesActions";
import { useFormik } from "formik";
import { AddAssignmentSchema } from "@/schema";
import {
  getDashboardData,
  getTeacherId,
} from "@/store/actions/dashboardActions";

const Assignments = ({ forStudent = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addAssignmentModal, setAddAssignmentModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState();
  const [term, setTerm] = useState("Term 1");

  const { assignmentsData } = useSelector((s) => s.assignmentReducer);

  const { teacherIdData } = useSelector((s) => s.dashboardReducer);
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
    const studentInfo = JSON.parse(localStorage.getItem("userInfo")) ?? {};

    localStorage.getItem("userType") == "teacher"
      ? dispatch(
          getTeacherId({
            payload: {
              query: {
                email: localStorage.getItem("email"),
              },
            },
            onSuccess: (data) => {
              setSelectedSection(data?.teacherSections[0]?.section);
              dispatch(
                getAssignmentsByCourseId({
                  onError: () => navigate("/404", { replace: true }),
                  payload: {
                    query: {
                      courseId: 1,
                      section: data?.teacherSections[0]?.section,
                    },
                    dispatch,
                  },
                })
              );
            },
          })
        )
      : dispatch(
          getAssignments({
            onError: () => navigate("/404", { replace: true }),
            payload: {
              query: {
                courseId: id,
                section: studentInfo?.sectionName,
                rollNumber: studentInfo?.rollNumber,
              },
              dispatch,
            },
          })
        );
  }, []);

  useEffect(() => {
    selectedSection &&
      dispatch(
        getAssignmentsByCourseId({
          onError: () => navigate("/404", { replace: true }),
          payload: {
            query: {
              courseId: 1,
              section: selectedSection,
            },
            dispatch,
          },
        })
      );
  }, [selectedSection]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 pb-8">
      {!forStudent && (
        <select
          type="select"
          placeholder="Select a section"
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {teacherIdData?.data?.teacherSections?.map((section, index) => (
            <option value={section?.section} key={index}>
              {section?.section}
            </option>
          ))}
        </select>
      )}

      {assignmentsData.loading && <Loader type="screen" />}

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
      {/* {localStorage.getItem("userType") == "teacher" && (
        <div className="flex flex-row gap-4">
          <button
            type="button"
            className="inline-block text-[1rem] rounded-full bg-custom-red px-6 pb-2 pt-2.5 font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
            onClick={() => setAddAssignmentModal(true)}
          >
            Add Assignment
          </button>
        </div>
      )} */}
      {assignmentsData.data?.assignmentList?.map((item, k) => (
        <div className="w-5/6">
          <QuizCard
            key={k + "_id_"}
            aid={item?.assignmentId}
            assignmentNo={k + 1}
            title={item?.assignmentTitle}
            attempts={23}
            total={26}
            grading={0}
            file={item?.file}
            forStudent={forStudent}
          />
        </div>
      ))}
      <ModalTop
        className="!rounded-[2.4rem] !max-w-[95.3rem] p-[3.5rem_2rem_3.4rem] xxs:p-[3.5rem_3rem_3.4rem] xs:p-[3.5rem_4rem_3.4rem] sm:p-[3.5rem_5rem_3.4rem] grid gap-[4.2rem]"
        open={Boolean(addAssignmentModal)}
        onClose={() => setAddAssignmentModal(false)}
      >
        <AddAssignment
          onClose={() => setAddAssignmentModal(false)}
          onAdd={(newAssignment) => {
            dispatch(
              createAssignment({
                payload: {
                  body: newAssignment,
                },
                onError: () => navigate("/404", { replace: true }),
                onSuccess: () => {
                  dispatch(
                    getAssignments({
                      onError: () => navigate("/404", { replace: true }),
                      payload: {
                        query: {
                          courseId: id,
                        },
                        dispatch,
                      },
                    })
                  );
                },
              })
            );
            setAddAssignmentModal(false);
          }}
        />
      </ModalTop>
    </div>
  );
};

export default Assignments;

const QuizCard = ({
  aid,
  assignmentNo,
  title,
  attempts,
  total,
  grading,
  file,
  forStudent,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [menu, setIsMenu] = useState(false);
  const { id, courseName, courseId } = useParams();
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
                Assignment {assignmentNo}:{" "}
              </h1>
              <h1 className="body-medium">{title}</h1>
            </div>
            {/* {!forStudent && (
              <h1 className="font-bold text-[1.5rem] text-custom-red">
                {attempts + " "} of {" " + total + " "} attempted
              </h1>
            )} */}
            <div
              className={`flex flex-row ${
                expanded ? "block" : "hidden"
              } justify-center items-center`}
            >
              <table>
                <tr>
                  <td>
                    <span className="body-medium">Participants</span>
                  </td>
                  <td className="pl-8">
                    <span className="body-regular">{total}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="body-medium">Submitted</span>
                  </td>
                  <td className="pl-8">
                    <span className="body-regular">{attempts}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="body-medium">Need Grading</span>
                  </td>
                  <td className="pl-8">
                    <span className="body-regular">{grading}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          {forStudent ? (
            <div className="flex flex-col gap-2 justify-end items-end">
              <button
                className="text-custom-red font-bold text-[1.5rem]"
                onClick={() =>
                  navigate(
                    `/enrolled-courses/${courseName}/${courseId}/${id}/assignments/${aid}`
                  )
                } //navigate(`/course/${id}/assignment/${aid}`)}
              >
                View Assignment
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-end items-end">
              <div onClick={() => setIsMenu(!menu)}>
                <MenuIcon />
              </div>
              {menu && <VisibilityMenu />}
              <button
                className="text-custom-red font-bold text-[1.5rem]"
                onClick={() => window.open(file)} //navigate(`/course/${id}/assignment/${aid}`)}
              >
                View Assignment
              </button>
              <button
                className="text-custom-red font-bold text-[1.5rem]"
                onClick={() =>
                  navigate(`/course/${id}/assignmentSummary/${aid}`)
                }
              >
                View all submissions
              </button>
            </div>
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

const AddAssignment = ({ onClose, onAdd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coursesData } = useSelector((s) => s.courseReducer);
  const { teacherIdData } = useSelector((s) => s.dashboardReducer);

  useEffect(() => {
    dispatch(
      getCourses({
        onError: () => navigate("/404", { replace: true }),
      })
    );
  }, []);

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      assignmentTitle: "",
      dueDate: "",
      description: "",
      file: null,
      courseId: "",
      totalMarks: "",
      visibility: true,
      teacherId: teacherIdData?.data?.teacherId,
      section: "",
      term: "Term 1",
    },
    validationSchema: AddAssignmentSchema,
    onSubmit: (v) => {
      const formData = new FormData();
      Object.entries(v).forEach(([key, value]) => {
        formData.append(key, value);
      });
      onAdd(formData);
    },
  });
  return (
    <div className="grid gap-[3.6rem]">
      {coursesData.loading && <Loader type="screen" />}
      <h2 className="text-[2.5rem] font-semibold text-black leading-[160%] flex justify-center items-center border-4 border-dashed border-custom-golden">
        Add New Assignment
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-[7.7rem]">
        <div className="flex flex-col gap-x-[2.1rem] gap-y-[1.6rem]">
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Assignment Title</h1>
            </div>
            <div>
              <MyInput
                type="text"
                placeholder="Enter Title"
                className="col-span-1 sm:col-span-6"
                value={values.assignmentTitle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.assignmentTitle && errors.assignmentTitle}
                name="assignmentTitle"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Due Date</h1>
            </div>
            <div>
              <MyInput
                type="date"
                placeholder="Enter date"
                className="col-span-1 sm:col-span-6"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dueDate && errors.dueDate}
                name="dueDate"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Attach Assignement</h1>
            </div>
            <div>
              <input
                type="file"
                onChange={(event) =>
                  setFieldValue("file", event.currentTarget.files[0])
                }
                onBlur={handleBlur}
                name="file"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Description</h1>
            </div>
            <div>
              <MyInput
                type="textarea"
                placeholder="Enter description"
                className="col-span-12"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                name="description"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Total Marks</h1>
            </div>
            <div>
              <MyInput
                type="number"
                placeholder="Enter total marks"
                className="col-span-1 sm:col-span-6"
                value={values.totalMarks}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.totalMarks && errors.totalMarks}
                name="totalMarks"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
            <div>
              <h1 className="body-medium h5">Select Course</h1>
            </div>
            <div>
              <MyInput
                type="select"
                placeholder="Select a Course"
                className="col-span-1 sm:col-span-6"
                value={values.courseId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.courseId && errors.courseId}
                name="courseId"
              >
                <option value="">Select a Course</option>
                {coursesData.data?.courseList?.map((course, index) => (
                  <option value={course?.courseId}>{course?.courseName}</option>
                ))}
              </MyInput>
            </div>
            <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
              <h1 className="body-medium h5">Select Section</h1>
            </div>
            <div>
              <MyInput
                type="select"
                placeholder="Select a section"
                className="col-span-1 sm:col-span-6"
                value={values.section}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.section && errors.section}
                name="section"
              >
                <option value="">Select a Section</option>
                {teacherIdData?.data?.teacherSections?.map((section, index) => (
                  <option value={section?.section}>{section?.section}</option>
                ))}
              </MyInput>
            </div>
            <div className="grid grid-cols-2 gap-x-[2.1rem] gap-y-[3.6rem] items-start">
              <h1 className="body-medium h5">Select Section</h1>
            </div>
            <div>
              <MyInput
                type="select"
                placeholder="Select a term"
                className="col-span-1 sm:col-span-6"
                value={values.term}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.term && errors.term}
                name="term"
              >
                <option value="">Select a Term</option>
                <option value="Term 1">Term 1</option>
                <option value="Term 2">Term 2</option>
                <option value="Term 3">Term 3</option>
              </MyInput>
            </div>
          </div>
        </div>

        <div className="grid gap-[3.2rem] justify-start grid-cols-[auto_auto]">
          <button
            className="p-[1.3rem_6.3rem] text-custom-dark-gren button opacity-button border bg-custom-button-color border-custom-button-color rounded-[.8rem] disabled:opacity-50"
            type="submit"
            disabled={!dirty}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="p-[1.3rem_6.3rem] text-custom-dark-gren button opacity border border-custom-button-color rounded-[.8rem]"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
