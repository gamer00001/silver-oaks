import Student from "@/assets/Icons/Student";
import { MyInput, MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React from "react";

const Attendance = () => {
  const { page } = useQueryParams({ page: 1, query: "" });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8">
        <SearchForm />
        <MyPagination page={page} totalPages={10 || 0} />
        <MyInput
                type="date"
                placeholder="Enter date"
                className="w-[16rem]"
                name="date"
              />
      </div>
      <div className="grid grid-cols-1 w-full">
        <Table />
      </div>
    </div>
  );
};

const Table = () => {
  const data = [
    {
      fullName: "John Roe",
      status: "P",
    },
    {
        fullName: "Caleb S",
        status: "P",
      },
      {
        fullName: "Zoe Roye",
        status: "A",
      },
      {
        fullName: "Scarlette",
        status: "P",
      },
      {
        fullName: "Ava Mon",
        status: "A",
      },
      {
        fullName: "Mason S",
        status: "A",
      },
  ];

  return (
    <>
      <div className="overflow-x-auto mb-16">
        <table className="w-full table text-[2rem]">
          <thead>
            <tr className="tr">
              <th className="p-9 th">Student Name</th>
              <th className="p-9 th">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((b, i) => (
              <tr key={i} className="tr">
                <td className="p-9 td flex flex-row justify-center items-center gap-8"><Student /> {b?.fullName || "--"}</td>
                <td className={`p-9 td text-center ${b?.status==="A"&&'text-red-800'}`}>{b?.status || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attendance;
