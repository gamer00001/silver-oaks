import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const createAssignment = asyncCatch(
  "assignmentSlice/createAssignments",
  async ({ config, body, dispatch }) =>
    axios
      .post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/create`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: config.headers.Authorization,
        },
      })
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

export const getAssignmentSubmissions = asyncCatch(
  "assignmentSlice/getAssignmentSubmissions",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/get-all-assignment-submissions/${query.assigmentId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const getAssignmentSubmission = asyncCatch(
  "assignmentSlice/getAssignmentSubmission",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/get-assignment-submission/
${query.assignmentId}/${query.studentId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const markAssignment = asyncCatch(
  "assignmentSlice/markAssignment",
  async ({ config, body, dispatch }) =>
    axios
      .put(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/mark-assignment`,
        body,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
);
