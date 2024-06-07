import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddQuizFields } from "@/constants/forms";
import { parseAddQuizDataForApi } from "@/parsers/admin-parser";
import { addQuizValidationSchema } from "@/schema";
import { addNewQuizByAdmin } from "@/store/actions/quizzesActions";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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
    isLoading: false,
  });
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const addNewQuiz = (formValues) => {
    handleLoader(true);

    const apiPayload = parseAddQuizDataForApi(formValues, params);

    dispatch(
      addNewQuizByAdmin({
        onSuccess: () => {
          handleLoader(false);
          toast.success("Quiz created successfully!");
          navigate(-1);
        },
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          body: apiPayload,
          dispatch,
        },
      })
    );
  };

  if (state.isLoading) {
    return <Loader type={"screen"} />;
  }

  return (
    <div className="pl-10">
      <h1 className="text-5xl font-bold">Add New Quiz</h1>

      <QuizCreator
        addNewQuiz={addNewQuiz}
        fields={AddQuizFields()}
        initialValues={initialValues}
        schema={addQuizValidationSchema}
      />
    </div>
  );
};

export default AddNewQuiz;
