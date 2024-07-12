import { Loader } from "@/components/common";
import QuizCreator from "@/components/common/QuizCreator";
import { AddOGAFields } from "@/constants/forms";
import {
  parseAddOgaDataForApi,
  prepareParseInitialValuesForOga,
} from "@/parsers/admin-parser";
import { addOgaValidationSchema } from "@/schema";
import {
  addNewOGAByAdmin,
  getOnGoingAssigmentById,
  updateOGAByAdmin,
} from "@/store/actions/ogaActions";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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
    isLoading: true,
  });
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const {
    assesmentData: { data, loading },
  } = useSelector((s) => s.ogaReducer);

  const handleLoader = (loading) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading ?? !prev.isLoading,
    }));
  };

  const addNewOga = (formValues) => {
    handleLoader(true);

    let apiPayload = parseAddOgaDataForApi(formValues, params);

    if (params.ogaId) {
      apiPayload = {
        ...apiPayload,
        ogaId: params.ogaId,
      };
    }

    const apiToCall = params.ogaId ? updateOGAByAdmin : addNewOGAByAdmin;

    dispatch(
      apiToCall({
        onSuccess: () => {
          handleLoader(false);
          toast.success(
            `OGA ${params.ogaId ? "updated" : "created"} successfully!`
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

  const fetchOgaById = () => {
    dispatch(
      getOnGoingAssigmentById({
        onError: (error) => {
          handleLoader(false);
          handleError(error);
        },
        payload: {
          query: {
            ogaId: params.ogaId,
          },
          dispatch,
        },
      })
    );
  };

  useEffect(() => {
    params.ogaId && fetchOgaById();

    handleLoader(false);
  }, []);

  if (state.isLoading || loading) {
    return <Loader type={"screen"} />;
  }

  return (
    <div className="pl-10">
      <h1 className="text-5xl font-bold">{`${
        params.ogaId ? "Edit" : "Add New"
      } OGA`}</h1>

      <QuizCreator
        type="OGA"
        addNewQuiz={addNewOga}
        fields={AddOGAFields()}
        initialValues={
          params.ogaId ? prepareParseInitialValuesForOga(data) : initialValues
        }
        schema={addOgaValidationSchema}
      />
    </div>
  );
};

export default AddNewOGA;
