import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getStatus = asyncCatch(
  "statsSlice/getStatus",
  async ({ config, query }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/admin/stats/pieData?duration=${query}`,
      config
    )
);

export const getReport = asyncCatch(
    "statsSlice/getReport",
    async ({ config, query }) =>
      axios.get(
        `${
          CONSTANTS.VITE_BACKEND_API_URL
        }/admin/stats/lineData?duration=${query}`,
        config
      )
  );
