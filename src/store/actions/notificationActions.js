import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getNotificationData = asyncCatch(
  "dashboardDataSlice/getNotificationData",
  async ({ config, query }) =>
    axios.get(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/course`, config)
);
