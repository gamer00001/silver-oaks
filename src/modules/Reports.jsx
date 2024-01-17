import QuizIcon from "@/assets/Icons/QuizIcon";
import { MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React, { useRef, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CSVLink } from "react-csv";
import html2canvas from "html2canvas";

const Reports = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const [option, setOption] = useState("basic");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center mb-8">
        <SearchForm />
        <select
          className="text-[2rem] border border-custom-golden border-solid"
          onChange={(e) => setOption(e.target.value)}
        >
          <option value={"basic"}>Basic Report</option>
          <option value={"graph"}>Graph Report</option>
        </select>
        <MyPagination page={page} totalPages={10 || 0} />
      </div>

      <div className="grid grid-cols-1 w-full">
        {option === "basic" ? <Table /> : <Graph />}
      </div>
    </div>
  );
};

const Table = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });

  const data = [
    {
      fullName: "John Roe",
      rollNo: "453",
      attempt: "1",
      start: {
        date: "08-12-23",
        time: "12:12pm",
      },
      lastAccess: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      attempt: "1",
      start: {
        date: "08-12-23",
        time: "12:12pm",
      },
      lastAccess: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      attempt: "1",
      start: {
        date: "08-12-23",
        time: "12:12pm",
      },
      lastAccess: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      attempt: "1",
      start: {
        date: "08-12-23",
        time: "12:12pm",
      },
      lastAccess: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
  ];

  const headers = [
    { label: 'Full Name', key: 'fullName' },
    { label: 'Roll No', key: 'rollNo' },
    { label: 'Attempt', key: 'attempt' },
    { label: 'Started On', key: 'start' },
    { label: 'Last accessed on', key: 'lastAccess' },
  ];
  
  const csvData = data.map(
    ({ fullName, rollNo, attempt, start, lastAccess }) => ({
      fullName,
      rollNo,
      attempt,
      start: `${start.date} ${start.time}`,
      lastAccess: `${lastAccess.date} ${lastAccess.time}`,
    })
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full table text-[2rem]">
        <tr className="tr">
          <th className="p-9 th">Full Name</th>
          <th className="p-9 th">Roll No</th>
          <th className="p-9 th">Attempt</th>
          <th className="p-9 th">Started On</th>
          <th className="p-9 th">Last accessed on</th>
        </tr>
        {data?.map((b, i) => (
          <tr className="tr">
            <td className="p-9 td text-center">{b?.fullName || "--"}</td>
            <td className="p-9 td text-center">{b?.rollNo || "--"}</td>
            <td className="p-9 td text-center">{b?.attempt || "--"}</td>
            <td className="p-9 td text-center">
              <div className="flex flex-col justify-center items-center">
                <span>{b?.start.date || "--"}</span>
                <span className="text-green-700">{b?.start.time || "--"}</span>
              </div>
            </td>
            <td className="p-9 td">
              <div className="flex flex-col justify-center items-center">
                <span>{b?.lastAccess.date || "--"}</span>
                <span className="text-green-700">
                  {b?.lastAccess.time || "--"}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </table>

      <div className="flex flex-row justify-end mt-8">
        <CSVLink
          data={csvData}
          headers={headers}
          filename={`reports_${Date.now()}.csv`}
          className="p-[1.3rem_6.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
        >

            Download
        </CSVLink>
      </div>
    </div>
  );
};

const Graph = () => {

  const chartContainerRef = useRef(null);

  const [chartImage, setChartImage] = useState(null);

  const downloadChartImage = async () => {
    if (chartContainerRef && chartContainerRef.current) {
      try {
        // Set a temporary state to trigger a re-render with the chart visible
        setChartImage("loading");

        // Wait for the re-render to complete
        await new Promise((resolve) => setTimeout(resolve, 0));

        const canvas = await html2canvas(chartContainerRef.current);
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `barchart_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error exporting chart as image:", error);
      } finally {
        // Reset the temporary state
        setChartImage(null);
      }
    }
  };

  const data = [
    {
      name: "0-10",
      pv: 2,
    },
    {
      name: "10-20",
      pv: 1,
    },
    {
      name: "20-30",
      pv: 4,
    },
    {
      name: "30-40",
      pv: 3,
    },
    {
      name: "40-50",
      pv: 2,
    },
    {
      name: "50-60",
      pv: 2,
    },
    {
      name: "60-70",
      pv: 1,
    },
  ];

  return (
      <div className="flex flex-col justify-center items-center">
      <div style={{ display: chartImage === "loading" ? "none" : "block" }}>
        <BarChart
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="pv" fill="#DEBB5B" />
        </BarChart>
      </div>

      <div
        ref={chartContainerRef}
        style={{ display: chartImage === "loading" ? "block" : "none" }}
      >
        <BarChart
          width={1000}
          height={600}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="pv" fill="#DEBB5B" />
        </BarChart>
      </div>

      <div className="flex flex-row justify-end mt-8">
        <button
          onClick={downloadChartImage}
          className="p-[1.3rem_6.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default Reports;
