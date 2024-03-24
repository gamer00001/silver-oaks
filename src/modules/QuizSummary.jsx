import QuizIcon from "@/assets/Icons/QuizIcon";
import { Loader, MyPagination, Td, Th, Tr } from "@/components/common";
import SearchForm from "@/components/common/SearchForm";
import { useQueryParams } from "@/hooks";
import { getQuizSubmissions } from "@/store/actions/quizzesActions";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const QuizSummary = () => {
  const { page, query } = useQueryParams({ page: 1, query: "" });
  const { id, qid } = useParams();
  const dispatch = useDispatch();
  const { quizSubmissionsData } = useSelector((s) => s.quizReducer);

  useEffect(() => {
    dispatch(
      getQuizSubmissions({
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            quizId: qid,
          },
        },
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <QuizIcon />
        <div className={`flex flex-col`}>
          <div className="flex flex-row gap-2 justify-center items-center">
            <h1 className="font-extrabold text-[1.5rem]">Quiz {qid}:</h1>
            {/* <h1 className="body-medium">ICT and Emerging Technologies</h1> */}
          </div>
          <h1 className="font-bold text-[1.5rem] text-custom-red">
            {quizSubmissionsData?.data?.quizSubmissionList?.length} attempted
          </h1>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mb-8">
        <SearchForm />
      </div>

      <div className="grid grid-cols-1 w-full">
        <Table />
      </div>
    </div>
  );
};

const Table = () => {
  const { quizSubmissionsData } = useSelector((s) => s.quizReducer);

  return (
    <div className="overflow-x-auto">
      {quizSubmissionsData?.loading && <Loader type={"screen"} />}
      <table className="w-full table text-[2rem]">
        <tr className="tr">
          <th className="p-9 th">Full Name</th>
          <th className="p-9 th">Roll No</th>
          <th className="p-9 th">Marks</th>
          <th className="p-9 th">Grade</th>
          <th className="p-9 th">Finished</th>
        </tr>
        {quizSubmissionsData?.data?.quizSubmissionList?.map((b, i) => (
          <tr className="tr">
            <td className="p-9 td">{b?.fullName || "--"}</td>
            <td className="p-9 td">{b?.studentRollNumber || "--"}</td>
            <td className="p-9 td">{b?.gainedMarks || "--"}</td>
            <td className="p-9 td">{b?.percentage || "--"}</td>
            <td className="p-9 td">
              <div className="flex flex-col justify-center items-center">
                <span>{b?.date || "--"}</span>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default QuizSummary;
