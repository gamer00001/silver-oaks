import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const addEvent = asyncCatch(
  "eventSlice/addEvent",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/add`, body, config)
);

export const getEvents = asyncCatch(
  "eventSlice/getEvents",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/teacher?teacherEmail=${query.teacherEmail}`,
      config
    )
);

export const getEventsByStudent = asyncCatch(
  "eventSlice/getEventsByStudent",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/course/${query.courseId}`,
      config
    )
);
