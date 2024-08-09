import EditIcon from "@/assets/Icons/EditIcon";
import { Loader, MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import { getAcademicRecord } from "@/store/actions/academicRecord";
import {
  getCourses,
  getCoursesByStudent,
  getCoursesByTeacher,
} from "@/store/actions/coursesActions";
import { getTeacherId } from "@/store/actions/dashboardActions";
import { fetchTeacherAcademicRecord } from "@/store/actions/studentActions";
import { currentLoggedInUserType, fetchCurrentUserInfo } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AcademicRecord = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { page } = useQueryParams({ page: 0, query: "" });
  const {
    teacherIdData: { data },
  } = useSelector((s) => s.dashboardReducer);
  const { studentCourses, teacherCourses } = useSelector(
    (s) => s.courseReducer
  );
  const {
    loginUserData: { user, userDetail },
  } = useSelector((s) => s.authReducer);
  const { studentAcademicRecords } = useSelector((s) => s.studentReducer);
  const dispatch = useDispatch();
  // const [selectedPage, setSelectedPage] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState("none");
  const [selectedSection, setSelectedSection] = useState("none");
  const [selectedGrade, setSelectedGrade] = useState("none");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allGrades, setAllGrade] = useState([]);
  const setAllGrades = () => {
    let allGrades = new Set();

    data?.teacherSections?.map((item) => {
      allGrades.add(item?.grade);
    });
    setAllGrade([...allGrades]);
  };
  useEffect(() => {
    const userInfo =
      currentLoggedInUserType() === "student"
        ? fetchCurrentUserInfo()
        : userDetail;
    console.log("This is user info ", userInfo);
    const apiToCall =
      currentLoggedInUserType() === "student"
        ? getCoursesByStudent
        : currentLoggedInUserType() === "teacher"
        ? getCoursesByTeacher
        : getCourses;
    dispatch(
      apiToCall({
        payload: {
          query: {
            studentId: userInfo?.studentId,
            teacherId: userInfo?.teacherId,
          },
        },
        onError: () => navigate("/404", { replace: true }),
        onSuccess: (res) => {
          const coursesList =
            res?.courseList?.map((item) => item?.courseId) ?? [];
          localStorage.setItem("coursesList", coursesList ?? []);
        },
      })
    );
  }, []);
  useEffect(() => {
    if (params?.id) {
      teacherCourses?.data?.courseList?.map((item) => {
        if (item?.courseId == params?.id) {
          setSelectedCourse(item);
        }
      });
    }
  }, [params?.id]);
  useEffect(() => {
    dispatch(
      fetchTeacherAcademicRecord({
        payload: {
          query: {
            term: selectedTerm,
            section: selectedSection,
            grade: selectedGrade,
            page: page,
          },
          dispatch,
        },
      })
    );
  }, [selectedTerm, selectedSection, selectedGrade, page]);
  useEffect(() => {
    dispatch(
      getTeacherId({
        payload: {
          query: {
            email: localStorage.getItem("email"),
          },
        },
      })
    );
  }, []);
  useEffect(() => {
    setAllGrades();
  }, [teacherCourses, data]);
  if (studentAcademicRecords.loading) return <Loader type="screen" />;
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8 mt-12">
        {/* <SearchForm /> */}
        <div className="flex items-center gap-3">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="text-[2rem] border border-custom-golden border-solid"
          >
            <option value="Term 01">Term 01</option>
            <option value="Term 02">Term 02</option>
            <option value="Term 03">Term 03</option>
            <option value="none">None</option>
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="text-[2rem] border border-custom-golden border-solid"
          >
            {data?.teacherSections?.map((item, index) => (
              <option key={index} value={item?.section}>
                {item?.section}
              </option>
            ))}
            <option value="none">None</option>
          </select>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="text-[2rem] border border-custom-golden border-solid"
          >
            {allGrades?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
        {studentAcademicRecords?.data?.totalPages > 1 && (
          <MyPagination
            page={page}
            totalPages={studentAcademicRecords?.data?.totalPages || 0}
          />
        )}
      </div>

      <div className="grid grid-cols-1 w-full">
        <Table data={studentAcademicRecords} />
      </div>
    </div>
  );
};

const Table = ({ data }) => {
  const { page = 0, query } = useQueryParams({ page: 0, query: "" });
  const dispatch = useDispatch();

  // const data = [
  //   {
  //     id: "276354723",
  //     fullName: "John Roe",
  //     rollNo: "453",
  //     quiz1: "0.1",
  //     term1: "13",
  //     term2: "13",
  //     total: "26.1",
  //   },
  //   {
  //     id: "276354723",
  //     fullName: "John Roe",
  //     rollNo: "453",
  //     quiz1: "0.1",
  //     term1: "13",
  //     term2: "13",
  //     total: "26.1",
  //   },
  //   {
  //     id: "276354723",
  //     fullName: "John Roe",
  //     rollNo: "453",
  //     quiz1: "0.1",
  //     term1: "13",
  //     term2: "13",
  //     total: "26.1",
  //   },
  //   {
  //     id: "276354723",
  //     fullName: "John Roe",
  //     rollNo: "453",
  //     quiz1: "0.1",
  //     term1: "13",
  //     term2: "13",
  //     total: "26.1",
  //   },
  // ];

  const exportData = () => {
    const exportedData = data?.data?.studentDetails?.map((item) => ({
      FullName: item.studentName || "--",
      RollNo: item.rollNumber || "--",
      Quizes: item.avgQuizGainedMarks || "--",
      OGA: item.avgOgaGainedMarks || "--",
      Assignments: item.avgAssignmentGainedMarks || "--",
      TermExam: item.avgExamGainedMarks || "--",
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(exportedData[0])
        .map((key) => key)
        .join(",") +
      "\n" +
      exportedData.map((obj) => Object.values(obj).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "academic_record.csv");
    document.body.appendChild(link);
    link.click();
  };

  const navigate = useNavigate();
  const { id, aid } = useParams();
  console.log("This is my data ", data);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table text-[2rem]">
          <thead>
            <tr className="tr">
              <th className="p-9 th w-[400px]">Full Name</th>
              <th className="p-9 th w-[200px]">Roll No</th>
              <th className="p-9 th w-[200px]">Quizes</th>
              <th className="p-9 th w-[200px]">OGA</th>
              <th className="p-9 th w-[200px]">Assignments</th>
              <th className="p-9 th w-[200px]">Term Exam</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.data?.studentDetails?.map((b, i) => (
              <tr key={i} className="tr">
                <td className="p-9 td w-[400px]">
                  <div className="flex flex-row items-center gap-2">
                    <img
                      className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
                      src={
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="Admin"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                    <p className="w-[100px]">{b?.studentName || "--"}</p>
                  </div>
                </td>
                <td className="p-9 td w-[200px]">{b?.rollNumber || "--"}</td>
                <td className="p-9 td w-[200px]">
                  {b?.avgQuizGainedMarks || "--"}
                </td>
                <td className="p-9 td w-[200px]">
                  {b?.avgOgaGainedMarks || "--"}
                </td>
                <td className="p-9 td w-[200px]">
                  {b?.avgAssignmentGainedMarks || "--"}
                </td>
                <td className="p-9 td w-[200px]">
                  {b?.avgExamGainedMarks || "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid gap-[3.2rem] justify-end grid-cols-[auto_auto] items-center m-16">
          <button
            className="p-[1.3rem_6.3rem] text-custom-red button opacity-button border bg-white rounded-[2.8rem] border-custom-red disabled:opacity-50"
            type="submit"
          >
            Import
          </button>
          <button
            className="p-[1.3rem_6.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
            type="submit"
            onClick={exportData}
          >
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default AcademicRecord;
