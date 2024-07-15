import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const fetchCampuses = asyncCatch(
  "commonSlice/fetchCampuses",
  async ({ config }) =>
    axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses`, config)
);

// export const fetchSections = asyncCatch(
//   "commonSlice/fetchSections",
//   async ({ config }) =>
//     axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses`, config)
// );

export const addCampus = asyncCatch("courseSlice/addCampus", async ({ body }) =>
  axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses`, body)
);

export const editCampus = asyncCatch(
  "courseSlice/editCampus",
  async ({ query, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses/update-campus/${query.campusId}`,
      body
    )
);

export const addSection = asyncCatch(
  "courseSlice/addSection",
  async ({ query, body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses/${query.campusId}/sections`,
      body
    )
);
export const editSection = asyncCatch(
  "courseSlice/editSection",
  async ({ query, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses/sections-update/${query.sectionId}`,
      body
    )
);

export const fetchSectionsByCampus = asyncCatch(
  "commonSlice/fetchSectionsByCampus",
  async ({ query, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses/${query.campusId}/${query.grade}`,
      config
    )
);

export const addNewExamByAdmin = asyncCatch(
  "quizSlice/addNewExamByAdmin",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/api/exams`, body, config)
);

export const updateExamByAdmin = asyncCatch(
  "quizSlice/updateExamByAdmin",
  async ({ config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/update-exam`,
      body,
      config
    )
);

export const deleteExamApi = asyncCatch(
  "quizSlice/deleteExamApi",
  async ({ config, query }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/${query.examId}`,
      config
    )
);

export const fetchExamsListing = asyncCatch(
  "commonSlice/fetchExamsListing",
  async ({ query, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/get-by-course/${query.courseId}${query.queryParams}`,
      config
    )
);

export const fetchExamDetailsById = asyncCatch(
  "commonSlice/fetchExamDetailsById",
  async ({ query, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/exams/${query.examId}`,
      config
    )
);
