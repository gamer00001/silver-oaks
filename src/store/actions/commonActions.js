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

export const addSection = asyncCatch(
  "courseSlice/addSection",
  async ({ query, body }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/api/campuses/${query.campusId}/sections`,
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
