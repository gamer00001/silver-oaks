import EditIcon from "@/assets/Icons/EditIcon";
import { MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentSummary = () => {
  const { page } = useQueryParams({ page: 1, query: "" });

  return (
    <div>
      <div className="flex flex-row gap-2 justify-start items-center mb-8">
        <h1 className="font-semibold text-[2.5rem]">Assignment 01:</h1>
        <h1 className="text-[2.5rem] text-gray-600">
          ICT and Emerging Technologies
        </h1>
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
        id: '276354723',
      fullName: "John Roe",
      rollNo: "453",
      status: 'No submission',
      marks: "Marked",
      grade: "A",
      Feedback: '14',
      finalMarks: "13",
    },
    {
        id: '35456436',
        fullName: "John Roe",
        rollNo: "453",
        status: 'No submission',
        marks: "Unmarked",
        grade: "A",
        Feedback: '14',
        finalMarks: "13",
    },
    {
        id: '5475345243',
        fullName: "John Roe",
        rollNo: "453",
        status: 'No submission',
        marks: "Unmarked",
        grade: "A",
        Feedback: '14',
        finalMarks: "13",
    },
    {
        id: '54364254',
        fullName: "John Roe",
        rollNo: "453",
        status: 'No submission',
        marks: "Marked",
        grade: "A",
        Feedback: '14',
        finalMarks: "13",
    },
  ];

  const navigate = useNavigate();
  const { id, aid } = useParams();

  return (
    <>
   <div className="overflow-x-auto">
  <table className="w-full table text-[2rem]">
    <thead>
      <tr className="tr">
        <th className="p-9 th">Full Name</th>
        <th className="p-9 th">Roll No</th>
        <th className="p-9 th">Status</th>
        <th className="p-9 th">Marking Status</th>
        <th className="p-9 th">Grade</th>
        <th className="p-9 th">Feedback</th>
        <th className="p-9 th">Final Marks</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((b, i) => (
        <tr key={i} className="tr">
          <td className="p-9 td">{b?.fullName || "--"}</td>
          <td className="p-9 td">{b?.rollNo || "--"}</td>
          <td className="p-9 td">{b?.status || "--"}</td>
          <td className={`flex flex-row items-center gap-4 p-9 td underline ${b?.marks==="Marked"? 'text-green-700': 'text-red-800'} hover:text-gray-700 cursor-pointer`} onClick={()=>navigate(`/course/${id}/assignment/${aid}/student/${b?.id}`)}>{b?.marks || "--"} <EditIcon/></td>
          <td className="p-9 td">{b?.grade || "--"}</td>
          <td className="p-9 td">{b?.Feedback || "--"}</td>
          <td className="p-9 td">{b?.finalMarks || "--"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </>
  );
};

export default AssignmentSummary;
