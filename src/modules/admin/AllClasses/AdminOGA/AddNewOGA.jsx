import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddOGAFields } from "@/constants/forms";
import { parseAddOgaDataForApi } from "@/parsers/admin-parser";
import { addOgaValidationSchema } from "@/schema";
import { addNewOGAByAdmin } from "@/store/actions/ogaActions";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  ogaTitle: "",
  totalMarks: null,
  time: null,
  dueDate: "",
  term: "",
  questions: [{ title: "", options: ["", "", "", ""], correctOption: null }],
};

const AddNewOGA = () => {
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

  const addNewOGA = (formValues) => {
    handleLoader(true);

    const apiPayload = parseAddOgaDataForApi(formValues, params);
    dispatch(
      addNewOGAByAdmin({
        onSuccess: () => {
          handleLoader(false);
          toast.success("OGA created successfully!");
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
      <h1 className="text-5xl font-bold">Add New OGA</h1>

      <QuizCreator
        addNewQuiz={addNewOGA}
        fields={AddOGAFields()}
        initialValues={initialValues}
        schema={addOgaValidationSchema}
      />
    </div>
  );
};

export default AddNewOGA;
