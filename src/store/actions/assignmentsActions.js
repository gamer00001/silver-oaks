import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const createAssignment = asyncCatch(
  "assignmentSlice/createAssignments",
  async ({ config, body, dispatch }) =>
    axios
      .post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/create`, body)
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const getAssignments = asyncCatch(
  "assignmentSlice/getAssignments",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/getByCourse/${query.courseId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const getAssignmentById = asyncCatch(
  "assignmentSlice/getAssignmentById",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/get/${query.assignmentId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const submitAssignmentByStudent = asyncCatch(
  "assignmentSlice/submitAssignmentByStudent",
  async ({ config, body, query, dispatch }) =>
    axios
      .post(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/submit${query.queryParams}`,
        body,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      }),
  "multipart/form-data"
);
