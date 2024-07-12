import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddExamFields } from "@/constants/forms";
import {
  parseAddExamDataForApi,
  prepareParseInitialValuesForExam,
} from "@/parsers/admin-parser";
import { addExamValidationSchema } from "@/schema";
import {
  addNewExamByAdmin,
  fetchExamDetailsById,
  updateExamByAdmin,
} from "@/store/actions/commonActions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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
    isLoading: true,
  });
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const {
    examByIdData: { data, loading },
  } = useSelector((s) => s.commonReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const addNewExam = (formValues) => {
    handleLoader(true);

    let apiPayload = parseAddExamDataForApi(formValues, params);

    if (params.examId) {
      apiPayload = {
        ...apiPayload,
        examId: params.examId,
      };
    }

    const apiToCall = params.examId ? updateExamByAdmin : addNewExamByAdmin;

    dispatch(
      apiToCall({
        onSuccess: () => {
          handleLoader(false);
          toast.success(
            `Exam ${params.examId ? "updated" : "created"} successfully!`
          );
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

  const fetchExamById = () => {
    dispatch(
      fetchExamDetailsById({
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          query: {
            examId: params.examId,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    params.examId && fetchExamById();

    handleLoader(false);
  }, []);

  if (state.isLoading || loading) {
    return <Loader type={"screen"} />;
  }
  return (
    <div className="pl-10">
      <h1 className="text-5xl font-bold">{`${
        params.examId ? "Edit" : "Add New"
      } Exam`}</h1>

      <QuizCreator
        type="Exam"
        addNewQuiz={addNewExam}
        fields={AddExamFields()}
        initialValues={
          params.ogaId ? prepareParseInitialValuesForExam(data) : initialValues
        }
        schema={addExamValidationSchema}
      />
    </div>
  );
};

export default AddNewExam;
