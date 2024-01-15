import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getCourses = asyncCatch(
  "courseSlice/getCourses",
  async ({ config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses`, config
    )
);