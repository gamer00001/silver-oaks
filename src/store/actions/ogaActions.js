import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const getOnGoingAssignmentsListing = asyncCatch(
  "ogaSlice/getOnGoingAssignmentsListing",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/oga/get-by-course/${query.courseId}`,
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
