import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddQuizFields } from "@/constants/forms";
import {
  parseAddQuizDataForApi,
  prepareParseInitialValues,
} from "@/parsers/admin-parser";
import { addQuizValidationSchema } from "@/schema";
import {
  addNewQuizByAdmin,
  getQuizById,
  updateQuizByAdmin,
} from "@/store/actions/quizzesActions";
import { removeEmptyValues } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  quizTitle: "",
  totalMarks: null,
  time: null,
  dueDate: "",
  term: "",
  questions: [{ title: "", options: ["", "", "", ""], correctOption: null }],
};

const AddNewQuiz = () => {
  const [state, setState] = useState({
    isLoading: true,
  });
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const {
    singleQuizData: { data, loading },
  } = useSelector((s) => s.quizReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const addNewQuiz = (formValues) => {
    handleLoader(true);

    let apiPayload = parseAddQuizDataForApi(formValues, params);

    if (params.quizId) {
      apiPayload = {
        ...apiPayload,
        quizId: params.quizId,
      };
    }

    const apiToCall = params.quizId ? updateQuizByAdmin : addNewQuizByAdmin;

    dispatch(
      apiToCall({
        onSuccess: () => {
          handleLoader(false);
          toast.success(
            `Quiz ${params.quizId ? "updated" : "created"} successfully!`
          );
          navigate(-1);
        },
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          body: removeEmptyValues(apiPayload),
          dispatch,
        },
      })
    );
  };

  const fetchQuizById = () => {
    dispatch(
      getQuizById({
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          query: {
            quizId: params.quizId,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    params.quizId && fetchQuizById();

    handleLoader(false);
  }, []);

  if (state.isLoading || loading) {
    return <Loader type={"screen"} />;
  }

  return (
    <div className="pl-10">
      <h1 className="text-5xl font-bold">Add New Quiz</h1>

      <QuizCreator
        addNewQuiz={addNewQuiz}
        fields={AddQuizFields()}
        initialValues={
          params?.quizId ? prepareParseInitialValues(data) : initialValues
        }
        schema={addQuizValidationSchema}
      />
    </div>
  );
};

export default AddNewQuiz;
