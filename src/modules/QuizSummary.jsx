import QuizIcon from "@/assets/Icons/QuizIcon";
import { MyPagination, Td, Th, Tr } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React from "react";
import toast from "react-hot-toast";

const QuizSummary = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <QuizIcon />
        <div className={`flex flex-col`}>
          <div className="flex flex-row gap-2 justify-center items-center">
            <h1 className="font-extrabold text-[1.5rem]">Quiz 01:</h1>
            <h1 className="body-medium">ICT and Emerging Technologies</h1>
          </div>
          <h1 className="font-bold text-[1.5rem] text-custom-red">
            23 of 26 attempted
          </h1>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mb-8">
        <SearchForm />
        <MyPagination page={page} totalPages={10 || 0} />
      </div>

      <div className="grid grid-cols-1 w-full">
        <Table />
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
      marks: "12",
      grade: "A",
      finished: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      marks: "12",
      grade: "A",
      finished: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      marks: "12",
      grade: "A",
      finished: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
    {
      fullName: "John Roe",
      rollNo: "453",
      marks: "12",
      grade: "A",
      finished: {
        date: "08-12-23",
        time: "12:12pm",
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full table text-[2rem]">
        <tr className="tr">
          <th className="p-9 th">Full Name</th>
          <th className="p-9 th">Roll No</th>
          <th className="p-9 th">Marks</th>
          <th className="p-9 th">Grade</th>
          <th className="p-9 th">Finished</th>
        </tr>
        {data?.map((b, i) => (
          <tr className="tr">
            <td className="p-9 td">{b?.fullName || "--"}</td>
            <td className="p-9 td">{b?.rollNo || "--"}</td>
            <td className="p-9 td">{b?.marks || "--"}</td>
            <td className="p-9 td">{b?.grade || "--"}</td>
            <td className="p-9 td">
              <div className="flex flex-col justify-center items-center">
                <span>{b?.finished.date || "--"}</span>
                <span className="text-green-700">
                  {b?.finished.time || "--"}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default QuizSummary;
