import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getQuizzes = asyncCatch(
  "quizSlice/getQuizzes",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/getByCourse/${query.courseId}/${query.studentRollNumber}`,
      config
    )
);

export const deleteQuizApi = asyncCatch(
  "quizSlice/deleteQuiz",
  async ({ config, query }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/delete/${query.quizId}`,
      config
    )
);

export const getQuizzesByCourseId = asyncCatch(
  "quizSlice/getQuizzesByCourseId",
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

export const addNewQuizByAdmin = asyncCatch(
  "quizSlice/addNewQuiz",
  async ({ config, body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/create`,
      body,
      config
    )
);

export const getQuizSubmissions = asyncCatch(
  "quizSlice/submitQuizByStudent",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/get/submissions/${query.quizId}`,
      config
    )
);
