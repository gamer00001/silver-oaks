import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Assignment = () => {
  const questions = [
    "Name three machines that we use in our daily life.",
    "Name three machines that run on electricity.",
    "Why is a computer called a smart machine?",
  ];
  const { id, aid } = useParams();
  const navigate = useNavigate();

  console.log(aid);

  return (
    <div>
      <div className="flex flex-row gap-2 justify-start items-center">
        <h1 className="font-semibold text-[2.5rem]">Assignment 01:</h1>
        <h1 className="text-[2.5rem] text-gray-600">
          {aid == 268534685 && id == 268534685
            ? "Scratch"
            : "ICT and Emerging Technologies"}
        </h1>
      </div>
      <div className="flex flex-col w-full p-12 border border-solid border-black rounded-xl mt-4">
        <div className="w-full flex flex-row justify-end">
          <h1 className="text-custom-red text-[1.2rem] font-semibold">
            Hidden from students
          </h1>
        </div>
        {aid == 1 && id == 1 ? (
          <iframe
            src="https://quizandsurveymaster.com/quiz/sample-quiz/"
            width="640"
            height="480"
            allow="autoplay"
          ></iframe>
        ) : (
          questions.map((question, i) => (
            <>
              <h1 className="text-[3rem] mt-4">
                Q{i + 1}:{" " + question}
              </h1>
            </>
          ))
        )}
      </div>
      <div className="flex flex-row justify-end m-12">
        <button
          className="bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white text-[2rem] enabled:hover:opacity-70 transition-opacity"
          onClick={() => navigate(`/course/${id}/assignmentSummary/${aid}`)}
        >
          View Submissions
        </button>
      </div>
    </div>
  );
};

export default Assignment;
