import { MOCK_GRADES } from "@/modules/admin/AllClasses";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Dropdown from "./Dropdown";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";

const LineChart = ({ categories, marksSeriesData }) => {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false, // Disable the toolbar menu
      },
    },
    xaxis: {
      categories: [],
    },
    plotOptions: {
      bar: {
        borderRadius: 6, // Set the border radius to 10px
        horizontal: false, // Ensure the bars are vertical
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#CA5050",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#DD8E8F",
            opacity: 1,
          },
        ],
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false, // Disable horizontal grid lines
        },
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Grades",
      data: [],
    },
  ]);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: categories,
      },
    }));

    setSeries([
      {
        name: "Grades",
        data: marksSeriesData,
      },
    ]);
  }, [categories, marksSeriesData]);

  console.log({ series, options });

  if (!isEmpty(series[0].data))
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
              // value={state?.selectedCampus}
              //   onChange={handleCampus}
              options={MOCK_GRADES().map((item) => item.title)}
              //   options={
              //     campusesData?.data
              //       ? campusesData?.data?.map((item) => item?.campusName)
              //       : []
              //   }
            />
          </Grid>
        </Grid>

        <div>
          <h1 className="text-black text-5xl font-bold">Marks Average</h1>
        </div>

        <div className="flex justify-center">
          <Chart
            options={options}
            series={series}
            type="bar"
            width={630}
            height={320}
          />
        </div>
      </div>
    );
};

export default LineChart;
