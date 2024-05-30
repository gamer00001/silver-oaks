import { Loader } from "@/components/common";
import LineChart from "@/components/common/LineChart";
import PieGraph from "@/components/common/PieGraph";
import StatsCard from "@/components/common/StatsCard";
import { getAdminDashboardData } from "@/store/actions/dashboardActions";
import { prepareLineChartData } from "@/utils/helper";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    adminDashboardData: { data, loading },
  } = useSelector((s) => s.dashboardReducer);

  const fetchAdminStats = () => {
    dispatch(
      getAdminDashboardData({
        payload: {
          query: {},
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-12">
      <div className="flex flex-1 gap-6">
        <StatsCard
          key={1}
          bgColor="#FFEFE7"
          subtitle={data?.data?.numberOfCampuses ?? 0}
        />
        <StatsCard
          key={2}
          bgColor="#FFF0C8"
          title="Total Teachers"
          icon="/total-teachers-icon.svg"
          subtitle={data?.data?.numberOfTeachers ?? 0}
        />
        <StatsCard
          key={3}
          title="Total Students"
          bgColor="#FDEBF9"
          icon="/total-students-icon.svg"
          subtitle={data?.data?.numberOfStudents ?? 0}
        />
      </div>

      <Grid container className="pt-10" spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          <LineChart
            {...prepareLineChartData(
              data?.data?.studentsPopulationStatsInGrades ?? []
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={5}>
          <PieGraph
            {...prepareLineChartData(
              data?.data?.studentsPopulationStatsInGrades ?? []
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
