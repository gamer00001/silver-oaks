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
