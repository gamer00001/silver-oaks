import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getQuizzes = asyncCatch(
  "quizSlice/getQuizzes",
  async ({ config, query }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/api/quizzes/getByCourse/${query.courseId}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error);
      })
);
