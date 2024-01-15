import Classes from "@/assets/Icons/Classes";
import Courses from "@/assets/Icons/Courses";
import DashboardPhoto from "@/assets/Icons/DashboardPhoto";
import RedDot from "@/assets/Icons/RedDot";
import Activity from "@/components/Dashboard/Activity";
import ReportChart from "@/components/Dashboard/ReportChart";
import StatusChart from "@/components/Dashboard/StatusChart";
import { Loader, PageHeading } from "@/components/common";
import { getCourses } from "@/store/actions/coursesActions";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

const Dashboard = () => {
  const { statusData, reportData } = useSelector((s) => s.statsReducer);
  const { coursesData } = useSelector((s) => s.courseReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(
  //     getCourses({
  //       onError: () => navigate("/404", { replace: true }),
  //     })
  //   );
  // }, [dispatch, navigate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        {(statusData.loading || reportData.loading) && (
          <Loader type="screen-bg" />
        )}
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
                  Explore the latest updates and events on your dashboard. Stay
                  informed and make the most of your teaching experience!
                </span>
                <div className="grid grid-cols-2">
                  <div className="flex flex-row justify-center">
                    <Courses />
                    <span className="body-medium py-[1.7rem] pl-4">
                      Total courses 7
                    </span>
                  </div>
                  <div className="flex flex-row justify-center">
                    <Classes />
                    <span className="body-medium py-[1.7rem] pl-4">
                      Total Grades 7
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
        <div className="grid gap-[1.6rem] px-[1.7rem] py-[1.7rem]">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="h5-bold text-custom-dark-gren"
          >
            Upcoming Activities
          </motion.h1>
        </div>
        <div className="pt-9 px-[1.7rem]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center items-center"
          >
        <MUICard className="flex justify-center items-center">
          <CardContent>
            {demoActivityData.map((activity, index) => (
              <div class="p-4 justify-between">
                <Activity
                  key={index}
                  date={activity.date}
                  heading={activity.heading}
                  link={activity.link}
                  status={activity.status}
                  time={activity.time}
                  readStatus={activity.readStatus}
                />
              </div>
            ))}
          </CardContent>
        </MUICard>
        </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
