import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
import { handleError } from "@/utils/errorHandling";

const QuizDetail = ({
  forStudent = false,
  forAssesment = false,
  forExam = false,
}) => {
  const [state, setState] = useState({
    quizInfo: {},
    ogaInfo: {},
    examInfo: {},
  });

  const [count, setCount] = useState(0);
  //   const [isCompleted, setIsCompleted] = useState(false);

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

  console.log({ questionsList });

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
          </div>
        </div>
      </div>
      <h1 className="px-[6rem] py-[2rem] text-custom-red font-bold text-[2rem]">
        {count + 1}/{questionsList?.length}
      </h1>
      {questionsList?.map((item, i) => (
        <div key={i} className={`flex flex-col gap-4 `}>
          <h1 className="px-[6rem] py-[2rem] font-semibold text-[2rem]">
            {i + 1 + ". " + item.question}
          </h1>

          <QuizOptions
            options={item}
            data={item.options}
            checked={item.answer}
          />
        </div>
      ))}
    </div>
  );
};

const QuizOptions = ({ checked, setChecked, data, options }) => {
  return (
    <div className="flex flex-col gap-4 px-[6rem]">
      {/* {data?.map((data, i) => ( */}
      <QuizOption
        checked={checked}
        // setChecked={setChecked}
        option={options.optionOne}
      />
      <QuizOption
        checked={checked}
        // setChecked={setChecked}
        option={options.optionTwo}
      />
      <QuizOption
        checked={checked}
        // setChecked={setChecked}
        option={options.optionThree}
      />
      <QuizOption
        checked={checked}
        // setChecked={setChecked}
        option={options.optionFour}
      />
    </div>
  );
};

export default QuizDetail;

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
