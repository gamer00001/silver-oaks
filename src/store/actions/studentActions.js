import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const fetchStudentInfo = asyncCatch(
  "studentSlice/fetchStudentInfo",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/get-student/${query.rollNumber}`,
        config
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const fetchStudentDashboardInfo = asyncCatch(
  "studentSlice/fetchStudentDashboardInfo",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/student-dashboard/get?rollNumber=${query.rollNumber}`,
        config
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const fetchStudentsListing = asyncCatch(
  "studentSlice/fetchStudentsListing",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/get-students/${query.campus}?page=${query.page}&size=${query.size}`,
        config
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const fetchStudentsListingByFilterApi = asyncCatch(
  "studentSlice/fetchStudentsListingByFilterApi",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/get-students/${query.queryParams}`,
        config
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const addStudent = asyncCatch(
  "studentSlice/addStudent",
  async ({ config, body, dispatch }) =>
    axios
      .post(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/create-student`,
        body
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const uploadBulkStudents = asyncCatch(
  "studentSlice/uploadBulkStudents",
  async ({ config, body, dispatch }) =>
    axios
      .post(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/upload-student-excel-data`,
        body
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const editStudent = asyncCatch(
  "studentSlice/editStudent",
  async ({ config, body, dispatch }) =>
    axios
      .put(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/update-student`,
        body
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const deleteStudent = asyncCatch(
  "studentSlice/deleteStudent",
  async ({ config, query, dispatch }) =>
    axios
      .delete(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/students/delete-student/${query?.rollNumber}`
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);
