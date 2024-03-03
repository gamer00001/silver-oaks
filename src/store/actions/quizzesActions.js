import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getQuizzes = asyncCatch(
  "quizSlice/getQuizzes",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/getByCourse/${query.courseId}`,
      config
    )
);

export const getQuizById = asyncCatch(
  "quizSlice/getQuizById",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/get/${query.quizId}`,
      config
    )
);

export const submitQuizByStudent = asyncCatch(
  "quizSlice/submitQuizByStudent",
  async ({ config, body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/submit`,
      body,
      config
    )
);
