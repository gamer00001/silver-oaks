import EditIcon from "@/assets/Icons/EditIcon";
import { MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AcademicRecord = () => {
  const { page } = useQueryParams({ page: 1, query: "" });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-8">
        <SearchForm />
        <select className="text-[2rem] border border-custom-golden border-solid">
          <option>Term 1</option>
          <option>Term 1</option>
          <option>Term 1</option>
          <option>All Terms</option>
        </select>
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
      id: "276354723",
      fullName: "John Roe",
      rollNo: "453",
      quiz1: "0.1",
      term1: "13",
      term2: "13",
      total: "26.1",
    },
    {
      id: "276354723",
      fullName: "John Roe",
      rollNo: "453",
      quiz1: "0.1",
      term1: "13",
      term2: "13",
      total: "26.1",
    },
    {
      id: "276354723",
      fullName: "John Roe",
      rollNo: "453",
      quiz1: "0.1",
      term1: "13",
      term2: "13",
      total: "26.1",
    },
    {
      id: "276354723",
      fullName: "John Roe",
      rollNo: "453",
      quiz1: "0.1",
      term1: "13",
      term2: "13",
      total: "26.1",
    },
  ];

  const exportData = () => {
    const exportedData = data.map((item) => ({
      FullName: item.fullName || "--",
      RollNo: item.rollNo || "--",
      Quiz1: item.quiz1 || "--",
      TermExam1: item.term1 || "--",
      TermExam2: item.term2 || "--",
      CourseTotal: item.total || "--",
    }));

    const csvContent = "data:text/csv;charset=utf-8," +
      Object.keys(exportedData[0]).map(key => key).join(",") + "\n" +
      exportedData.map(obj => Object.values(obj).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "academic_record.csv");
    document.body.appendChild(link);
    link.click();
  };

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
              <th className="p-9 th">Quiz :01</th>
              <th className="p-9 th">Term Exam: 01</th>
              <th className="p-9 th">Term Exam :02</th>
              <th className="p-9 th">Course Total</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((b, i) => (
              <tr key={i} className="tr">
                <td className="p-9 td flex flex-row items-center gap-2">
                  {" "}
                  <img
                    className="w-[4.3rem] h-[4.3rem] border-2 border-custom-offwhite rounded-full object-cover "
                    src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Admin"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  />
                  {b?.fullName || "--"}
                </td>
                <td className="p-9 td">{b?.rollNo || "--"}</td>
                <td className="p-9 td">{b?.quiz1 || "--"}</td>
                <td className="p-9 td">{b?.term1 || "--"}</td>
                <td className="p-9 td">{b?.term2 || "--"}</td>
                <td className="p-9 td">{b?.total || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid gap-[3.2rem] justify-end grid-cols-[auto_auto] items-center m-16">
            <button
              className="p-[1.3rem_6.3rem] text-custom-red button opacity-button border bg-white rounded-[2.8rem] border-custom-red disabled:opacity-50"
              type="submit"
            >
              Import
            </button>
            <button
              className="p-[1.3rem_6.3rem] text-white button opacity-button border bg-custom-red rounded-[2.8rem] disabled:opacity-50"
              type="submit"
              onClick={exportData}
            >
              Export
            </button>
          </div>
      </div>
    </>
  );
};

export default AcademicRecord;
