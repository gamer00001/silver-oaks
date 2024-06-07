import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getDashboardData = asyncCatch(
  "dashboardDataSlice/getDashboardData",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/dashboard/data/${query.email}`,
      config
    )
);

export const getAdminDashboardData = asyncCatch(
  "dashboardDataSlice/getAdminDashboardData",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/dashboard/data-stats${query.queryParams}`,
      config
    )
);

export const getTeacherId = asyncCatch(
  "teacherIdSlice/getTeacherIdData",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/teachers/get/${query.email}`,
      config
    )
);
