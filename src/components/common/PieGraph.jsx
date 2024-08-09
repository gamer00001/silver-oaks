import { MOCK_GRADES } from "@/modules/admin/AllClasses";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Dropdown from "./Dropdown";
import { isEmpty } from "lodash";

const PieGraph = ({ categories, populationSeriesData }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false, // Disable the toolbar menu
      },
    },
    labels: [],
    colors: [
      "#C53F3F", // Color for Grade I
      "#AEA8A8", // Color for Grade II
      "#FDEBF9", // Color for Grade III
      "#FCCACB", // Color for Others
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
    // responsive: [
    //   {
    //     breakpoint: 1600,
    //     options: {
    //       chart: {
    //         width: 300,
    //       },
    //       legend: {
    //         position: "bottom",
    //       },
    //     },
    //   },
    // ],
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: categories,
    }));

    setSeries(populationSeriesData);
  }, [categories, populationSeriesData]);

  if (!isEmpty(series))
    return (
      <div className="bg-[#FAFAFA] rounded-xl p-7">
        <Grid container className="flex justify-between items-center">
          <Grid item xs={12} sm={8}>
            <h2 className="text-[#7A7A7A] text-xl font-semibold">
              Student Stats
            </h2>
          </Grid>
        </Grid>
        <div>
          <h1 className="text-black text-5xl font-bold pb-10 pt-5">
            Student Population
          </h1>
        </div>
        <div className="flex justify-center">
          <Chart
            options={options}
            series={series}
            type="donut"
            width={400}
            height={300}
          />
        </div>
      </div>
    );
};

export default PieGraph;
