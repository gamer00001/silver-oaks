import EditIcon from "@/assets/Icons/EditIcon";
import { Loader, MyPagination } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import { getAssignmentSubmissions } from "@/store/actions/assignmentsActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentSummary = () => {
  const { page } = useQueryParams({ page: 1, query: "" });
  const dispatch = useDispatch();
  const { aid } = useParams();

  useEffect(() => {
    dispatch(
      getAssignmentSubmissions({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            assigmentId: aid,
          },
        },
      })
    );
  }, []);

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
        {/* <MyPagination page={page} totalPages={10 || 0} /> */}
      </div>

      <div className="grid grid-cols-1 w-full">
        <Table />
      </div>
    </div>
  );
};

const Table = () => {
const { assignmentSubmissionsData } = useSelector((s) => s.assignmentReducer);
  const navigate = useNavigate();
  const { id, aid } = useParams();
  const { query } = useQueryParams({ page: 1, query: "" });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = assignmentSubmissionsData?.data?.assignmentSubmissionResponseList?.filter(item =>
        item?.studentName?.toLowerCase().includes(query.toLowerCase()) ||  
        item?.studentId === query.toLowerCase() || 
        item?.submissionDate?.toLowerCase().includes(query.toLowerCase()) 
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(assignmentSubmissionsData?.data?.assignmentSubmissionResponseList);
    }
  }, [assignmentSubmissionsData, query]);

  return (
    <>
    {assignmentSubmissionsData.loading && <Loader type="screen" />}
   <div className="overflow-x-auto">
  <table className="w-full table text-[2rem]">
    <thead>
      <tr className="tr">
        <th className="p-9 th">Full Name</th>
        <th className="p-9 th">Roll No</th>
        <th className="p-9 th">Submission Date</th>
        <th className="p-9 th">Marking Status</th>
        <th className="p-9 th">Grade</th>
        <th className="p-9 th">Feedback</th>
        <th className="p-9 th">Final Marks</th>
      </tr>
    </thead>
    <tbody>
    {filteredData?.map((b, i) => (
        <tr key={i} className="tr">
          <td className="p-9 td">{b?.studentName || "--"}</td>
          <td className="p-9 td">{b?.studentId || "--"}</td>
          <td className="p-9 td">{b?.submissionDate || "--"}</td>
          <td className={`flex flex-row items-center gap-4 p-9 td underline ${b?.obtainedMarks!==-1? 'text-green-700': 'text-red-800'} hover:text-gray-700 cursor-pointer`} onClick={()=>navigate(`/course/${b?.studentId}/assignment/${aid}/student/${b?.assignmentId}`)}>{b?.obtainedMarks===-1?"Unmarked": "Marked" || "--"} <EditIcon/></td>
          <td className="p-9 td">{b?.obtainedGrade || "--"}</td>
          <td className="p-9 td">{b?.comments || "--"}</td>
          <td className="p-9 td">{b?.obtainedMarks || "--"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


    </>
  );
};

export default AssignmentSummary;
