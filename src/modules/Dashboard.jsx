import Classes from "@/assets/Icons/Classes";
import Courses from "@/assets/Icons/Courses";
import DashboardPhoto from "@/assets/Icons/DashboardPhoto";
import { Loader, PageHeading } from "@/components/common";
import {
  getCourses,
  getCoursesByStudent,
  getCoursesByTeacher,
} from "@/store/actions/coursesActions";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chart1, Chart2, ChartContainer, Pie1, Pie2 } from "@/assets/common";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StatsIcon from "@/assets/Icons/StatsIcon";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";
import {
  getDashboardData,
  getTeacherId,
} from "@/store/actions/dashboardActions";
import StudentDashboard from "./StudentDashboard";
import { currentLoggedInUserType, fetchCurrentUserInfo } from "@/utils/helper";
import { scrollToTop } from "@/utils";
import AdminDashboard from "./admin/AdminDashboard";
import StatsBlock from "@/components/common/StatsBlock";

const demoActivityData = [
  {
    date: "07",
    heading: "Meeting with VC",
    link: "https://zoom.com",
    status: "Upcoming",
    time: "10:00 AM",
    readStatus: false,
  },
  {
    date: "08",
    heading: "Admin Meeting",
    link: "https://example.com",
    status: "Due soon",
    time: "3:00 PM",
    readStatus: true,
  },
];

const data = [
  { courseName: "Group A", percentage: 40, grade: 2 },
  { courseName: "Group B", percentage: 20, grade: 5 },
  { courseName: "Group C", percentage: 10, grade: 3 },
  { courseName: "Group D", percentage: 30, grade: 1 },
];
const pieChartData = [
  {
    name: "Group A",
    value: 0,
    fill: "#FFD900",
  },
  {
    name: "Group B",
    value: 0,
    fill: "#FFD100",
  },
  {
    name: "Group C",
    value: 0,
    fill: "#FFD200",
  },
  {
    name: "Group D",
    value: 0,
    fill: "#FFD500",
  },
  {
    name: "Group E",
    value: 0,
    fill: "#FFD800",
  },
];
const Dashboard = ({ forStudent = false }) => {
  const [state, setState] = useState({
    userType: currentLoggedInUserType(),
  });

  const { dashboardData } = useSelector((s) => s.dashboardReducer);
  const {
    loginUserData: { user, userDetail },
  } = useSelector((s) => s.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("This is dashboard data ", dashboardData.data);
  const renderColorfulLegendText = (value, entry) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {value}
      </span>
    );
  };

  useEffect(() => {
    const userType = currentLoggedInUserType();
    scrollToTop();
    if (userType === "teacher") {
      dispatch(
        getDashboardData({
          payload: {
            query: {
              email: localStorage.getItem("email"),
            },
          },
          // onError: () => navigate("/404", { replace: true }),
        })
      );
      dispatch(
        getTeacherId({
          payload: {
            query: {
              email: localStorage.getItem("email"),
            },
          },
        })
      );
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    const userInfo =
      currentLoggedInUserType() === "student" ? userDetail : userDetail;
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
  if (state.userType === "admin") {
    return <AdminDashboard />;
  }

  if (state.userType === "student") {
    return <StudentDashboard />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {dashboardData.loading && <Loader type="screen" />}
      <div>
        <div className="grid gap-[1.6rem] px-[1.7rem]">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h5-bold text-custom-dark-gren"
          >
            Welcome Back!
          </motion.h1>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          // className="flex justify-center items-center mt-4 gap-12"
        >
          <div className="flex gap-12 pt-12 p-10 max-md:flex-wrap">
            <StatsBlock value={dashboardData.data?.termCompletion ?? 0} />
            <StatsBlock
              title="Punctuality"
              value={dashboardData.data?.punctualityScore ?? 0}
              bgColor="#FFF8F0"
              activeColor="#F9AB35"
              heading="Your Activity"
              inactiveColor="#F3F6FF"
              icon="/activity-icon.svg"
            />
          </div>
        </motion.div>

        <div className="pt-9 px-[1.7rem]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <MUICard
              style={{ backgroundColor: "#F3E7C6", borderRadius: "1rem" }}
            >
              <CardContent>
                <div class="grid grid-cols-2">
                  <div className="grid grid-rows-3 gap-[0.2rem] px-[1.7rem]">
                    <h1 className="h5-bold">
                      Check Your Students Activities and Updates
                    </h1>
                    <span className="body-medium text-custom-dark-gren">
                      Explore the latest updates and events on your dashboard.
                      Stay informed and make the most of your teaching
                      experience!
                    </span>
                    <div className="grid grid-cols-2">
                      <div className="flex flex-row items-center justify-center">
                        <Courses />
                        <span className="body-medium py-[1.7rem] pl-4 max-md:text-[9px]">
                          Total courses {dashboardData.data?.totalCourses}
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-center">
                        <StatsIcon />
                        <span className="body-medium py-[1.7rem] pl-4 max-md:text-[9px]">
                          Total Grades {dashboardData.data?.totalGrades}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DashboardPhoto />
                </div>
              </CardContent>
            </MUICard>
          </motion.div>
        </div>
        <div className="grid gap-[1.6rem] px-[1.7rem] mt-14">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h5-bold text-custom-dark-gren"
          >
            Student population
          </motion.h1>
        </div>
        <div className="pt-5 px-[1.7rem]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center w-full"
          >
            <MUICard className="flex justify-center items-center mb-4 w-full">
              <CardContent>
                {/* {demoActivityData.map((activity, index) => ( */}
                <div className="w-full h-[36rem] flex justify-center items-center">
                  {/* <ResponsiveContainer className="w-full"> */}
                  <PieChart
                    width={350}
                    height={350}
                    className="flex justify-center items-center max-w-[350px] max-h-[350px]"
                  >
                    {/* <Legend
                      height={36}
                      iconType="circle"
                      layout="vertical"
                      verticalAlign="middle"
                      iconSize={20}
                      padding={5}
                      formatter={renderColorfulLegendText}
                    /> */}
                    <Pie
                      data={
                        dashboardData.data?.dashboardGraphStats?.length > 0
                          ? dashboardData.data?.dashboardGraphStats?.map(
                              (item, index) => ({
                                name: item?.courseName,
                                value:
                                  item?.percentage <= 0 ? 1 : item?.percentage,
                                fill: `#${Math.floor(
                                  Math.random() * 16777215
                                ).toString(16)}`,
                              })
                            )
                          : pieChartData
                      }
                      cx={120}
                      cy={200}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}`
                      }
                      className="flex justify-center items-center w-full"
                    ></Pie>
                  </PieChart>
                  {/* </ResponsiveContainer> */}
                </div>
                {/* ))} */}
              </CardContent>
            </MUICard>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
