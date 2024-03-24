import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import Table from "@/components/common/Table";
import { useQueryParams } from "@/hooks";

const StudentGrades = () => {
  const { page } = useQueryParams({ page: 1, query: "" });

  const dispatch = useDispatch();

  const { assignmentsData } = useSelector((s) => s.assignmentReducer);

  //   useEffect(() => {
  //     const studentInfo = JSON.parse(localStorage.getItem("userInfo")) ?? {};

  //     dispatch(
  //       getAssignments({
  //         onError: () => navigate("/404", { replace: true }),
  //         payload: {
  //           query: {
  //             courseId: id,
  //             section: studentInfo?.sectionName,
  //             rollNumber: studentInfo?.rollNumber,
  //           },
  //           dispatch,
  //         },
  //       })
  //     );
  //   }, []);

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
        <Table columns={[]} rows={[]} />
      </div>
    </div>
  );
};

export default StudentGrades;
