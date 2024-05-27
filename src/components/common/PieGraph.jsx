import { MOCK_GRADES } from "@/modules/admin/AllClasses";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import Dropdown from "./Dropdown";

const PieGraph = () => {
  const [state] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false, // Disable the toolbar menu
        },
      },
      labels: ["Grade I", "Grade II", "Grade III", "Others"],
      colors: [
        "#C53F3F", // Color for Apple
        "#AEA8A8", // Color for Mango
        "#FDEBF9", // Color for Orange
        "#FCCACB", // Color for Banana
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "65%", // Adjust the size of the donut hole
          },
        },
      },
      dataLabels: {
        enabled: false, // Disable labels on the chart segments
      },
      //   responsive: [
      //     {
      //       breakpoint: 1600,
      //       options: {
      //         chart: {
      //           width: 300,
      //         },
      //         legend: {
      //           position: "bottom",
      //         },
      //       },
      //     },
      //   ],
    },
    series: [50, 30, 20, 10],
  });

  return (
    <div className="bg-[#FAFAFA] rounded-xl p-5">
      <Grid container className="flex justify-between items-center">
        <Grid item xs={12} sm={8}>
          <h2 className="text-[#7A7A7A] text-xl font-semibold">
            Student Stats
          </h2>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Dropdown
            placeholder="Campus"
            options={MOCK_GRADES().map((item) => item.title)}
          />
        </Grid>
      </Grid>
      <div>
        <h1 className="text-black text-5xl font-bold pb-10">
          Student Population
        </h1>
      </div>
      <div className="flex justify-center">
        <Chart
          options={state.options}
          series={state.series}
          type="donut"
          width={450}
          height={310}
        />
      </div>
    </div>
  );
};

export default PieGraph;
