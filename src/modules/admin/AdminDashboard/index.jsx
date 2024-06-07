import { Loader } from "@/components/common";
import Dropdown from "@/components/common/Dropdown";
import LineChart from "@/components/common/LineChart";
import PieGraph from "@/components/common/PieGraph";
import StatsCard from "@/components/common/StatsCard";
import { getAdminDashboardData } from "@/store/actions/dashboardActions";
import { fetchCompusListing } from "@/utils/common-api-helper";
import { prepareLineChartData } from "@/utils/helper";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [state, setState] = useState({
    selectedCampus: "All",
  });
  const dispatch = useDispatch();

  const {
    adminDashboardData: { data, loading },
  } = useSelector((s) => s.dashboardReducer);

  const { campusesData, sectionsData } = useSelector((s) => s.commonReducer);

  const handleCampus = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      selectedCampus: selectedValue,
    }));
  };

  const fetchAdminStats = () => {
    const { selectedCampus } = state;
    const queryParams = `${
      selectedCampus !== "All" ? `?campus=${selectedCampus}` : ""
    }`;

    dispatch(
      getAdminDashboardData({
        payload: {
          query: {
            queryParams,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    fetchAdminStats();
  }, [state.selectedCampus]);

  useEffect(() => {
    fetchCompusListing(dispatch);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-12">
      <Grid container className="pb-10">
        <Grid sm={10} />

        <Grid sm={2}>
          <Dropdown
            placeholder="Campus"
            value={state?.selectedCampus}
            onChange={handleCampus}
            options={
              campusesData?.data
                ? [
                    "All",
                    ...campusesData?.data?.map((item) => item?.campusName),
                  ]
                : []
            }
          />
        </Grid>
      </Grid>
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
