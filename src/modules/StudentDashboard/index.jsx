import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import StatsBlock from "@/components/common/StatsBlock";
import CourseBlock from "@/components/common/CourseBlock";
import { Loader } from "@/components/common";
import { fetchStudentDashboardInfo } from "@/store/actions/studentActions";
import { getCourses } from "@/store/actions/coursesActions";
import { CoursesColors } from "@/utils/helper";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    coursesData: { data },
  } = useSelector((s) => s.courseReducer);

  const { studentDashboardData } = useSelector((s) => s.studentReducer);

  useEffect(() => {
    dispatch(
      getCourses({
        onError: () => navigate("/404", { replace: true }),
      })
    );

    dispatch(
      fetchStudentDashboardInfo({
        payload: {
          query: {
            rollNumber: localStorage.getItem("email"),
          },
          dispatch,
        },
      })
    );
  }, []);

  if (studentDashboardData.loading) {
    return <Loader type="screen" />;
  }

  return (
    <div className="p-10">
      <ProfileView
        studentName={studentDashboardData?.data?.studentName}
        // studentInfo={studentData?.data}
      />

      <div className="flex gap-10">
        <div className="w-3/4">
          <ActivityBlock activityData={studentDashboardData?.data} />

          <EnrolledCourses
            navigate={navigate}
            coursesList={data?.courseList ?? []}
          />
        </div>

        <div className="w-3/12">
          <div className="flex justify-center">
            <img className="pt-8 pl-12" src="/dashboard-icon.svg" alt="icon" />
          </div>

          <div className="flex justify-between pt-12">
            <span className="text-black font-bold text-4xl">Notification</span>
            <span className="text-[#7A1315] font-bold text-4xl cursor-pointer">
              See All
            </span>
          </div>

          <NotificationBlock />
          <NotificationBlock />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

const ProfileView = ({ studentInfo, studentName }) => {
  return (
    <div className="bg-gradient-to-r from-green-800 via-green-600 to-purple-200 h-15.625rem w-full rounded-3xl p-20 relative flex">
      <div className="flex flex-col">
        <span className="text-white bg-opacity-75 text-lg">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <span className="text-6xl font-bold text-white pt-10">
          {`Welcome back, ${studentName}!`}
        </span>

        <span className="text-white bg-opacity-75 text-2xl pt-4">
          Always stay updated in your student portal
        </span>
      </div>

      <div className="flex">
        <img
          className="absolute bottom-10 w-1/4 right-96"
          src="/scholar-icon.png"
          alt="scholar-icon"
        />
        <img
          className="absolute bottom-0 w-96 right-52"
          src="/student-icon.png"
          alt="icon"
        />
        <img
          className="absolute right-0 bottom-0"
          src="/backpack-icon.png"
          alt="backpack-icon"
        />
      </div>
    </div>
  );
};

const ActivityBlock = ({ activityData }) => {
  return (
    <div className="pt-12">
      <span className="text-black font-bold text-4xl">Your Activity</span>

      <div className="flex gap-12 pt-12">
        <StatsBlock value={activityData?.attendancePercentAge ?? 0} />
        <StatsBlock
          value={activityData?.termCompletion ?? 0}
          bgColor="#FFF8F0"
          activeColor="#F9AB35"
          heading="Your Activity"
          inactiveColor="#F3F6FF"
          icon="/activity-icon.svg"
        />
      </div>
    </div>
  );
};

const EnrolledCourses = ({ coursesList = [], navigate }) => {
  console.log({ coursesList });
  return (
    <div className="pt-12">
      <div className="flex justify-between">
        <span className="text-black font-bold text-4xl">Enrolled Courses</span>
        <span
          className="text-[#7A1315] font-bold text-4xl cursor-pointer"
          onClick={() => navigate("/enrolled-courses")}
        >
          See All
        </span>
      </div>

      <div className="flex gap-12 pt-12">
        {coursesList?.map((item, index) => (
          <CourseBlock
            key={index}
            data={CoursesColors[index]}
            textColor={CoursesColors[index].textColor}
            bgColor={CoursesColors[index].backgroundColor}
            link={`/enrolled-courses/lectures/${item.courseId}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

const NotificationBlock = () => {
  return (
    <div className="bg-white p-12 flex flex-col rounded-3xl mt-8 shadow-lg">
      <span className="text-black font-bold text-3xl">Prelim payment due</span>

      <span className="text-[#00000080] text-2xl pt-2">
        Sorem ipsum dolor sit amet, consectetur adipiscing elit.
      </span>
    </div>
  );
};
