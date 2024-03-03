import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import MUICard from "@mui/material/Card";
import QuizIcon from "@/assets/Icons/QuizIcon";
import {
  getQuizById,
  submitQuizByStudent,
} from "@/store/actions/quizzesActions";
import { Loader } from "@/components/common";

const Quiz = ({ forStudent = false }) => {
  const [checked, setChecked] = useState(null);
  const [state, setState] = useState({
    quizInfo: {},
  });

  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();
  const { id, qid } = useParams();
  const navigate = useNavigate();

  const {
    singleQuizData: { data, loading },
  } = useSelector((s) => s.quizReducer);

  useEffect(() => {
    dispatch(
      getQuizById({
        onSuccess: (res) => {
          setState((prev) => ({
            ...prev,
            quizInfo: res,
          }));
        },
        onError: () => navigate("/404", { replace: true }),
        payload: {
          query: {
            quizId: qid,
          },
          dispatch,
        },
      })
    );
  }, []);

  console.log({ data, checked, state });

  // const quiz = [
  //   {
  //     question:
  //       "Computers are much faster to perform mathematical calculations than",
  //     options: [{ option: "Human" }, { option: "Both" }, { option: "Animals" }],
  //   },
  //   {
  //     question: "What is the capital city of France?",
  //     options: [
  //       { option: "Paris" },
  //       { option: "Berlin" },
  //       { option: "London" },
  //     ],
  //   },
  //   {
  //     question: "Which planet is known as the Red Planet?",
  //     options: [{ option: "Mars" }, { option: "Venus" }, { option: "Jupiter" }],
  //   },
  //   {
  //     question: "Who wrote 'Romeo and Juliet'?",
  //     options: [
  //       { option: "William Shakespeare" },
  //       { option: "Charles Dickens" },
  //       { option: "Jane Austen" },
  //     ],
  //   },
  //   {
  //     question: "What is the capital city of Japan?",
  //     options: [
  //       { option: "Tokyo" },
  //       { option: "Beijing" },
  //       { option: "Seoul" },
  //     ],
  //   },
  //   {
  //     question: "Who painted the Mona Lisa?",
  //     options: [
  //       { option: "Leonardo da Vinci" },
  //       { option: "Vincent van Gogh" },
  //       { option: "Pablo Picasso" },
  //     ],
  //   },
  //   {
  //     question: "In which year did World War II end?",
  //     options: [{ option: "1945" }, { option: "1918" }, { option: "1939" }],
  //   },
  //   {
  //     question: "What is the largest mammal on Earth?",
  //     options: [
  //       { option: "Blue Whale" },
  //       { option: "Elephant" },
  //       { option: "Giraffe" },
  //     ],
  //   },
  //   {
  //     question:
  //       "Which planet is known as the 'Morning Star' or 'Evening Star'?",
  //     options: [{ option: "Venus" }, { option: "Mars" }, { option: "Mercury" }],
  //   },
  //   {
  //     question: "Who developed the theory of relativity?",
  //     options: [
  //       { option: "Albert Einstein" },
  //       { option: "Isaac Newton" },
  //       { option: "Galileo Galilei" },
  //     ],
  //   },
  // ];

  const nextQuest = () => {
    if (!checked) {
      return;
    }

    let updatedList = state?.quizInfo?.quizQuestions?.map((item, index) =>
      index === count
        ? {
            ...item,
            answer: checked,
          }
        : { ...item }
    );

    setState((prev) => ({
      ...prev,
      quizInfo: {
        ...prev.quizInfo,
        quizQuestions: updatedList,
      },
    }));

    if (count < data?.quizQuestions.length - 1) {
      setCount(count + 1);
      setChecked(null);
    } else setIsCompleted(true);
  };

  const handleSubmitQuiz = () => {
    const { quizInfo } = state;

    const payload = {
      courseId: quizInfo?.course?.courseId,
      quizId: quizInfo?.quizId,
      quizQuestionList: quizInfo.quizQuestions,
      studentRollNumber: +localStorage.getItem("email"),
      totalMarks: quizInfo.totalMarks,
    };

    dispatch(
      submitQuizByStudent({
        payload: {
          body: payload,
        },
        onSuccess: () =>
          navigate(
            `/${forStudent ? "enrolled-courses" : "course"}/quizzes/${id}`
          ),
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  if (loading) {
    return <Loader type="screen" />;
  }

  return (
    <div>
      <div className="flex flex-row gap-2">
        <QuizIcon />
        <div className={`flex flex-col justify-center`}>
          <div className="flex flex-row gap-2 justify-center items-center">
            <h1 className="font-extrabold text-[1.5rem]">{`Quiz ${data?.quizId}:`}</h1>
            <h1 className="body-medium">{data?.quizTitle ?? "N/A"}</h1>
          </div>
          {/* <h1 className="font-bold text-[1.5rem] text-custom-red">
            23 of 26 attempted
          </h1> */}
        </div>
      </div>
      <h1 className="px-[6rem] py-[2rem] text-custom-red font-bold text-[2rem]">
        {count + 1}/{data?.quizQuestions?.length}
      </h1>
      {data?.quizQuestions?.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col gap-4 ${count === i ? "block" : "hidden"}`}
        >
          <h1 className="px-[6rem] py-[2rem] font-semibold text-[2rem]">
            {item.question}
          </h1>

          <QuizOptions
            options={item}
            checked={checked}
            data={item.options}
            setChecked={setChecked}
          />
        </div>
      ))}
      <div className="flex justify-end items-center py-[2rem]">
        <button
          className=" flex gap-4 font-semibold bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white enabled:hover:opacity-70 transition-opacity text-4xl mr-[6rem]"
          onClick={
            isCompleted
              ? () => handleSubmitQuiz()
              : // navigate(
                //   `/${
                //     forStudent ? "enrolled-courses" : "course"
                //   }/quizzes/${id}`
                // )
                nextQuest
          }
        >
          {isCompleted ? "Finish" : "Next"}

          <img src="/next-icon.svg" alt="icon" />
        </button>
      </div>
    </div>
  );
};

const QuizOptions = ({ checked, setChecked, data, options }) => {
  return (
    <div className="flex flex-col gap-4 px-[6rem]">
      {/* {data?.map((data, i) => ( */}
      <QuizOption
        checked={checked}
        setChecked={setChecked}
        option={options.optionOne}
      />
      <QuizOption
        checked={checked}
        setChecked={setChecked}
        option={options.optionTwo}
      />
      <QuizOption
        checked={checked}
        setChecked={setChecked}
        option={options.optionThree}
      />
      <QuizOption
        checked={checked}
        setChecked={setChecked}
        option={options.optionFour}
      />
      {/* ))} */}
    </div>
  );
};

export default Quiz;

const QuizOption = ({ setChecked, option, checked }) => {
  return (
    <MUICard className="flex justify-start items-center">
      <CardContent>
        <label
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setChecked(option)}
        >
          <div
            className={`w-6 h-6 border-2 border-solid border-orange-500 rounded-full flex items-center justify-center transition duration-300 ${
              checked === option ? "bg-orange-500" : "bg-white"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-orange-500 transition duration-300 ${
                checked === option ? "visible" : "invisible"
              }`}
            ></div>
          </div>
          <span className="text-black text-[1.5rem]">{option}</span>
        </label>
      </CardContent>
    </MUICard>
  );
};
