import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddExamFields } from "@/constants/forms";
import { parseAddExamDataForApi } from "@/parsers/admin-parser";
import { addExamValidationSchema } from "@/schema";
import { addNewExamByAdmin } from "@/store/actions/commonActions";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  examTitle: "",
  totalMarks: null,
  time: null,
  dueDate: "",
  term: "",
  questions: [{ title: "", options: ["", "", "", ""], correctOption: null }],
};

const AddNewExam = () => {
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

  const addNewExam = (formValues) => {
    handleLoader(true);

    const apiPayload = parseAddExamDataForApi(formValues, params);

    dispatch(
      addNewExamByAdmin({
        onSuccess: () => {
          handleLoader(false);
          toast.success("Exam created successfully!");
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
      <h1 className="text-5xl font-bold">Add New Exam</h1>

      <QuizCreator
        addNewQuiz={addNewExam}
        fields={AddExamFields()}
        initialValues={initialValues}
        schema={addExamValidationSchema}
      />
    </div>
  );
};

export default AddNewExam;
