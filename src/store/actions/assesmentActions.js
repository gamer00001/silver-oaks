import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const getAssesments = asyncCatch(
  "assesmentsSlice/getAssesments",
  async ({ config, query }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/course/${query.courseId}/${query.studentRollNumber}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error);
      })
);

export const getExamById = asyncCatch(
  "assesmentsSlice/getExamById",
  async ({ config, query }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/${query.examId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error);
      })
);

export const submitExamByStudent = asyncCatch(
  "quizSlice/submitExamByStudent",
  async ({ config, body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/submit`,
      body,
      config
    )
);
