import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getAssesments = asyncCatch(
  "assesmentsSlice/getAssesments",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/course/${query.courseId}`,
      config
    )
);
