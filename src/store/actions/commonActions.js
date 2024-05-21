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
