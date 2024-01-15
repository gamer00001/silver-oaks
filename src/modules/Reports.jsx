import QuizIcon from "@/assets/Icons/QuizIcon";
import { MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React, { useState } from "react";
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
    <div className="flex justify-center items-center">
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
        <Bar
          dataKey="pv"
          fill="#DEBB5B"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </div>
  );
};

export default Reports;
