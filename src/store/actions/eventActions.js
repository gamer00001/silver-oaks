import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const addEvent = asyncCatch(
  "eventSlice/addEvent",
  async ({ config, body }) => 
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/add`,
      config,
      body
    )
);
