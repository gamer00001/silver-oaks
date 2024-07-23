import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const addEvent = asyncCatch(
  "eventSlice/addEvent",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/add`, body, config)
);

export const editEvent = asyncCatch(
  "eventSlice/editEvent",
  async ({ config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/update`,
      body,
      config
    )
);

export const deleteEvent = asyncCatch(
  "eventSlice/deleteEvent",
  async ({ config, query, body }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/delete/${query.eventId}`,
      body,
      config
    )
);

export const getEvents = asyncCatch(
  "eventSlice/getEvents",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/teacher/${query.teacherEmail}`,
      config
    )
);

export const getEventsByStudent = asyncCatch(
  "eventSlice/getEventsByStudent",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/events/course/${query.courseId}/${query.section}`,
      config
    )
);
