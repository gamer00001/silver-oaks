import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { handleError } from "@/utils/errorHandling";
import axios from "axios";

export const fetchTeachersListing = asyncCatch(
  "studentSlice/fetchTeachersListing",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers?page=${query.page}&size=${query.size}`,
        config
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const addTeacher = asyncCatch(
  "studentSlice/addTeacher",
  async ({ config, body, dispatch }) =>
    axios
      .post(
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers/create-teacher`,
        body
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const editTeacher = asyncCatch(
  "studentSlice/editTeacher",
  async ({ config, body, dispatch }) =>
    axios
      .put(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers`, body)
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const uploadBulkTeachers = asyncCatch(
  "studentSlice/uploadBulkTeachers",
  async ({ config, body, dispatch }) =>
    axios
      .post(
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers/upload-teacher-excel-data`,
        body
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);

export const deleteTeacher = asyncCatch(
  "studentSlice/deleteTeacher",
  async ({ config, query, dispatch }) =>
    axios
      .delete(
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers/${query?.teacherId}`
      )
      .then((response) => response)
      .catch((error) => {
        handleError(error, dispatch);
      })
);
