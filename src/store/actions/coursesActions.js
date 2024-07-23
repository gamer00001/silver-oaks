import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getCourses = asyncCatch(
  "courseSlice/getCourses",
  async ({ config }) =>
    axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses`, config)
);

export const getAllCoursesByGrade = asyncCatch(
  "courseSlice/getAllCoursesByGrade",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses/by-grade/${query.gradeId}`,
      config
    )
);

export const addCourse = asyncCatch("courseSlice/addCourse", async ({ body }) =>
  axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses`, body)
);

export const updateCourse = asyncCatch(
  "courseSlice/updateCourse",
  async ({ body }) =>
    axios.put(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses`, body)
);

export const deleteCourse = asyncCatch(
  "courseSlice/addCourse",
  async ({ query }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/courses/${query?.courseId}`
    )
);
