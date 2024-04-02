import { useEffect, useState } from "react";
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
import {
  getOnGoingAssigmentById,
  submitOgaByStudent,
} from "@/store/actions/ogaActions";
import {
  getExamById,
  submitExamByStudent,
} from "@/store/actions/assesmentActions";
import { isEmpty } from "validator";

const Quiz = ({
  forStudent = false,
  forAssesment = false,
  forExam = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [timeInSeconds, setTimeInSeconds] = useState(0); // 30 minutes in seconds

  const [state, setState] = useState({
    quizInfo: {},
    ogaInfo: {},
    examInfo: {},
  });

  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, qid, aid, eid } = useParams();

  const {
    singleQuizData: { data, loading },
  } = useSelector((s) => s.quizReducer);

  const { assesmentData } = useSelector((s) => s.ogaReducer);

  const { singleExamData } = useSelector((s) => s.assesmentReducer);

  useEffect(() => {
    if (forAssesment) {
      dispatch(
        getOnGoingAssigmentById({
          onSuccess: (res) => {
            const time = res.time ?? 1;
            setTimeInSeconds(+time * 60);

            setState((prev) => ({
              ...prev,
              ogaInfo: res,
            }));
          },
          onError: () => navigate("/404", { replace: true }),
          payload: {
            query: {
              ogaId: aid,
            },
            dispatch,
          },
        })
      );
    } else if (forExam) {
      dispatch(
        getExamById({
          onSuccess: (res) => {
            const time = res?.time ?? 1;
            setTimeInSeconds(+time * 60);

            setState((prev) => ({
              ...prev,
              examInfo: res,
            }));
          },
          onError: () => navigate("/404", { replace: true }),
          payload: {
            query: {
              examId: eid,
            },
            dispatch,
          },
        })
      );
    } else
      dispatch(
        getQuizById({
          onSuccess: (res) => {
            const time = res.time ?? 1;
            setTimeInSeconds(+time * 60);

            setState((prev) => ({
              ...prev,
              quizInfo: res,
            }));
          },
          // onError: () => navigate("/404", { replace: true }),
          payload: {
            query: {
              quizId: qid,
            },
            dispatch,
          },
        })
      );
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeInSeconds((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerInterval);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(timerInterval);
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Convert timeInSeconds to minutes and seconds
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  // Format minutes and seconds with leading zeros if necessary
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const backQuestion = () => {
    count > 0 && setCount(count - 1);
    setIsCompleted(false);
  };

  const nextQuest = (option) => {
    let list;

    if (forAssesment) {
      list = state.ogaInfo?.ogaQuestions;
    } else if (forExam) {
      list = state.examInfo?.examQuestions;
    } else {
      list = state?.quizInfo?.quizQuestions;
    }

    let updatedList = list?.map((item, index) =>
      index === count
        ? {
            ...item,
            answer: option,
          }
        : { ...item }
    );

    setState((prev) => ({
      ...prev,
      quizInfo: {
        ...prev.quizInfo,
        quizQuestions: forAssesment ? [] : updatedList,
      },
      ogaInfo: {
        ...prev?.ogaInfo,
        ogaQuestions: forAssesment ? updatedList : [],
      },
      examInfo: {
        ...prev?.examInfo,
        examQuestions: forExam ? updatedList : [],
      },
    }));

    if (count < list.length - 1) {
      setCount(count + 1);
    } else setIsCompleted(true);
  };

  const handleSubmitQuiz = () => {
    if (forAssesment) {
      submitOga();
    } else if (forExam) {
      submitExam();
    } else {
      submitQuiz();
    }
  };

  const submitExam = () => {
    const { examInfo } = state;

    const payload = {
      courseId: examInfo?.course?.courseId,
      examId: examInfo?.examId,
      examQuestionList: examInfo?.examQuestions?.map((item) => ({
        ...item,
        answer: item.answer ?? "",
      })),
      studentRollNumber: +localStorage.getItem("email"),
      totalMarks: examInfo.totalMarks,
    };

    dispatch(
      submitExamByStudent({
        payload: {
          body: payload,
        },
        onSuccess: () =>
          navigate(`/${forStudent ? "enrolled-courses" : "course"}/exam/${id}`),
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const submitOga = () => {
    const { ogaInfo } = state;

    const payload = {
      courseId: ogaInfo?.course?.courseId,
      ogaId: ogaInfo?.ogaId,
      ogaQuestionList: ogaInfo?.ogaQuestions?.map((item) => ({
        ...item,
        answer: item.answer ?? "",
      })),
      studentRollNumber: +localStorage.getItem("email"),
      totalMarks: ogaInfo.totalMarks,
    };

    dispatch(
      submitOgaByStudent({
        payload: {
          body: payload,
        },
        onSuccess: () =>
          navigate(
            `/${
              forStudent ? "enrolled-courses" : "course"
            }/on-going-assesments/${id}`
          ),
        onError: () => navigate("/404", { replace: true }),
      })
    );
  };

  const submitQuiz = () => {
    const { quizInfo } = state;

    const payload = {
      courseId: quizInfo?.course?.courseId,
      quizId: quizInfo?.quizId,
      quizQuestionList: quizInfo?.quizQuestions?.map((item) => ({
        ...item,
        answer: item?.answer ?? "",
      })),
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

  const selectedData = forAssesment
    ? state.ogaInfo
    : forExam
    ? state.examInfo
    : state.quizInfo;

  const questionsList = forAssesment
    ? assesmentData?.data?.ogaQuestions
    : forExam
    ? singleExamData.data?.examQuestions
    : data?.quizQuestions;

  return (
    <div>
      <div className="flex flex-row gap-2 justify-between items-center">
        {(loading || assesmentData?.loading || singleExamData?.loading) && (
          <Loader type="screen" />
        )}

        <div className={`flex flex-row gap-4 justify-center`}>
          <QuizIcon />
          <div className={`flex flex-col justify-center`}>
            <div className="flex flex-row gap-2 justify-center items-center">
              <h1 className="font-extrabold text-[1.5rem]">{`${
                forAssesment ? "Assesment" : "Quiz"
              } ${
                (selectedData?.ogaId ||
                  selectedData?.quizId ||
                  selectedData?.examId) ??
                "N/A"
              }:`}</h1>

              <h1 className="body-medium">
                {(selectedData?.ogaTitle ||
                  selectedData?.quizTitle ||
                  selectedData?.examTitle) ??
                  "N/A"}
              </h1>
            </div>

            {/* <h1 className="font-bold text-[1.5rem] text-custom-red">
            23 of 26 attempted
          </h1> */}
          </div>
        </div>

        <div className="text-custom-red font-bold text-[2rem]">
          {formattedTime}
        </div>
      </div>
      <h1 className="px-[6rem] py-[2rem] text-custom-red font-bold text-[2rem]">
        {count + 1}/{questionsList?.length}
      </h1>
      {!isEmpty(questionsList) &&
        questionsList?.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col gap-4 ${
              count === i ? "block" : "hidden"
            }`}
          >
            <h1 className="px-[6rem] py-[2rem] font-semibold text-[2rem]">
              {item.question}
            </h1>

            <QuizOptions
              options={item}
              data={item.options}
              checked={selectedOptions[i]}
              setChecked={(option) => {
                if (option) {
                  let updatedList = [...selectedOptions];
                  updatedList[i] = option;
                  setSelectedOptions(updatedList);
                }
              }}
            />

            {questionsList?.length > 0 && (
              <div className="flex justify-end items-center py-[2rem]">
                {count > 0 && (
                  <button
                    className=" flex gap-4 font-semibold bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white enabled:hover:opacity-70 transition-opacity text-4xl mr-[6rem]"
                    onClick={backQuestion}
                  >
                    <img
                      src="/next-icon.svg"
                      className="transform rotate-180"
                      alt="icon"
                    />
                    Previous
                  </button>
                )}
                <button
                  className=" flex gap-4 font-semibold bg-custom-red rounded-[4rem] pl-8 pr-8 pt-4 pb-4 text-white enabled:hover:opacity-70 transition-opacity text-4xl mr-[6rem]"
                  onClick={
                    isCompleted
                      ? () => handleSubmitQuiz()
                      : () =>
                          selectedOptions[i] && nextQuest(selectedOptions[i])
                  }
                >
                  {isCompleted ? "Finish" : "Next"}

                  <img src="/next-icon.svg" alt="icon" />
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

const QuizOptions = ({ checked, setChecked, data, options }) => {
  debugger;
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
    <MUICard
      className="flex justify-start items-center cursor-pointer"
      onClick={() => setChecked(option)}
    >
      <CardContent>
        <label className="flex items-center space-x-2 cursor-pointer">
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
