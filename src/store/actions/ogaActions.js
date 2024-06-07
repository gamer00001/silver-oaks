import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const getOnGoingAssignmentsListing = asyncCatch(
  "ogaSlice/getOnGoingAssignmentsListing",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/get-by-course/${query.courseId}/${query.studentRollNumber}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const getOnGoingAssigmentById = asyncCatch(
  "ogaSlice/getOnGoingAssigmentById",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/get/${query.ogaId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const submitOgaByStudent = asyncCatch(
  "quizSlice/submitOgaByStudent",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/submit`, body, config)
);

export const addNewOGAByAdmin = asyncCatch(
  "quizSlice/addNewOGAByAdmin",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/create`, body, config)
);

export const deleteOGAFromApi = asyncCatch(
  "quizSlice/deleteOGAApi",
  async ({ config, query }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/delete/${query.ogaId}`,
      config
    )
);
