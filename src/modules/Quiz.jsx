import QuizIcon from "@/assets/Icons/QuizIcon";
import { CardContent } from "@mui/material";
import React, { useState } from "react";
import MUICard from "@mui/material/Card";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {
  const [checked, setChecked] = useState();
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const quiz = [
    {
      question:
        "Computers are much faster to perform mathematical calculations than",
      options: [{ option: "Human" }, { option: "Both" }, { option: "Animals" }],
    },
    {
      question: "What is the capital city of France?",
      options: [
        { option: "Paris" },
        { option: "Berlin" },
        { option: "London" },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { option: "Mars" },
        { option: "Venus" },
        { option: "Jupiter" },
      ],
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: [
        { option: "William Shakespeare" },
        { option: "Charles Dickens" },
        { option: "Jane Austen" },
      ],
    },
    {
      question: "What is the capital city of Japan?",
      options: [
        { option: "Tokyo" },
        { option: "Beijing" },
        { option: "Seoul" },
      ],
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        { option: "Leonardo da Vinci" },
        { option: "Vincent van Gogh" },
        { option: "Pablo Picasso" },
      ],
    },
    {
      question: "In which year did World War II end?",
      options: [
        { option: "1945" },
        { option: "1918" },
        { option: "1939" },
      ],
    },
    {
      question: "What is the largest mammal on Earth?",
      options: [
        { option: "Blue Whale" },
        { option: "Elephant" },
        { option: "Giraffe" },
      ],
    },
    {
      question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
      options: [
        { option: "Venus" },
        { option: "Mars" },
        { option: "Mercury" },
      ],
    },
    {
      question: "Who developed the theory of relativity?",
      options: [
        { option: "Albert Einstein" },
        { option: "Isaac Newton" },
        { option: "Galileo Galilei" },
      ],
    },
  ];

  const nextQuest = () => {
    if (count < quiz.length-1) setCount(count + 1)
    else setIsCompleted(true);
  };

  const navigate = useNavigate();
  const {id} = useParams();

  return (
    <div>
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
      <h1 className="px-[6rem] py-[2rem] text-custom-red font-bold text-[2rem]">
        {count + 1}/{quiz.length}
      </h1>
      {quiz?.map((data, i) => (
        <div
          className={`flex flex-col gap-4 ${count === i ? "block" : "hidden"}`}
        >
          <h1 className="px-[6rem] py-[2rem] font-semibold text-[2rem]">
            {data.question}
          </h1>

          <QuizOptions
            setChecked={setChecked}
            checked={checked}
            data={data.options}
          />
        </div>
      ))}
      <div className="flex justify-end items-center py-[2rem]">
        <button
          className=" bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white enabled:hover:opacity-70 transition-opacity"
          onClick={isCompleted?()=>navigate(`/course/quizzes/${id}`):nextQuest}
        >
          {isCompleted?'Finish':'Next'}
        </button>
      </div>
    </div>
  );
};

const QuizOptions = ({ checked, setChecked, data }) => {
  return (
    <div className="flex flex-col gap-4">
      {data?.map((data, i) => (
        <MUICard className="flex justify-start items-center">
          <CardContent>
            <label
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setChecked(data.option)}
            >
              <div
                className={`w-6 h-6 border-2 border-solid border-orange-500 rounded-full flex items-center justify-center transition duration-300 ${
                  checked === data.option ? "bg-orange-500" : "bg-white"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-orange-500 transition duration-300 ${
                    checked === data.option ? "visible" : "invisible"
                  }`}
                ></div>
              </div>
              <span className="text-black text-[1.5rem]">{data.option}</span>
            </label>
          </CardContent>
        </MUICard>
      ))}
    </div>
  );
};

export default Quiz;
