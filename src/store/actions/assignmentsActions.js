import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getAssignments = asyncCatch(
  "assignmentSlice/getAssignments",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/assignments/getByCourse/${query.courseId}`,
      config
    )
);
