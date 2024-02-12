import Classes from "@/assets/Icons/Classes";
import Courses from "@/assets/Icons/Courses";
import DashboardPhoto from "@/assets/Icons/DashboardPhoto";
import { Loader, PageHeading } from "@/components/common";
import { getCourses } from "@/store/actions/coursesActions";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chart1, Chart2, ChartContainer, Pie1, Pie2 } from "@/assets/common";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StatsIcon from "@/assets/Icons/StatsIcon";
import { PieChart, Pie, Legend } from "recharts";
import { getDashboardData } from "@/store/actions/dashboardActions";

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
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

const Dashboard = () => {
  const { coursesData } = useSelector((s) => s.courseReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderColorfulLegendText = (value, entry) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {value}
      </span>
    );
  };

  useEffect(() => {
    dispatch(
      getDashboardData({
        payload: {
          query:{
            email: localStorage.getItem('email')
          },
        },
        // onError: () => navigate("/404", { replace: true }),
      })
    );
  }, [dispatch, navigate]);
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center items-center mt-4 gap-12"
        >
          <MUICard className="flex justify-center items-center">
            <CardContent className=" bg-[#ECFFF5]">
              <div className="grid  md:grid-cols-3">
                <div className="col-span-2 flex flex-row p-8 pr-12">
                  <div className="mt-12 mr-4">
                    <StatsIcon />
                  </div>
                  <div>
                    <h1 className="text-gray-400 text-[2.5rem]">
                      Course Stats
                    </h1>
                    <h1 className="text-bold text-[2rem]">Term Completion</h1>
                  </div>
                </div>
                <div style={{ width: 180, height: 180 }}>
                  <CircularProgressbar
                    value={66}
                    text={`66%`}
                    className="text-red"
                    styles={buildStyles({
                      pathColor: `rgba(168, 2, 2, ${60 / 100})`,
                      textColor: "#f88",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#a80202",
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </MUICard>
          <MUICard className="flex justify-center items-center">
            <CardContent className=" bg-[#FFF8F0]">
              <div className="grid md:grid-cols-3">
                <div className="col-span-2 flex flex-row p-2 pr-12">
                  <div className="mt-12 mr-4">
                    <StatsIcon />
                  </div>
                  <div>
                    <h1 className="text-gray-400 text-[2.5rem]">
                      Your Activity
                    </h1>
                    <h1 className="text-bold text-[2rem]">Punctuality</h1>
                  </div>
                </div>
                <div style={{ width: 180, height: 180 }}>
                  <CircularProgressbar
                    value={66}
                    text={`66%`}
                    className="text-red"
                    styles={buildStyles({
                      pathColor: `rgba(168, 2, 2, ${60 / 100})`,
                      textColor: "#f88",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#a80202",
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </MUICard>
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
                      <div className="flex flex-row justify-center">
                        <Courses />
                        <span className="body-medium py-[1.7rem] pl-4">
                          Total courses 7
                        </span>
                      </div>
                      <div className="flex flex-row justify-center">
                        <StatsIcon />
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
            Student population
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
                {/* {demoActivityData.map((activity, index) => ( */}
                <div class="p-4 flex justify-center items-center">
                  <PieChart width={1000} height={300} className="flex justify-center items-center">
                    <Legend
                      height={36}
                      iconType="circle"
                      layout="vertical"
                      verticalAlign="middle"
                      iconSize={20}
                      padding={5}
                      formatter={renderColorfulLegendText}
                    />
                    <Pie
                      data={data}
                      cx={120}
                      cy={200}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}`}
                    ></Pie>
                  </PieChart>
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
