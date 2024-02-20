import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getLectures = asyncCatch(
  "lectureSlice/getLectures",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/by-course/${query.courseId}`,
      config
    )
);

export const getLectureReportTable = asyncCatch(
  "lectureSlice/getLecturesReportTable",
  async ({ config, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/${query.lectureId}/report-table-data`,
      config
    )
);

export const changeLectureStatus = asyncCatch(
  "lectureSlice/changeLectureStatus",
  async ({ config, query }) =>
    axios.patch(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/${query.lectureId}/set-visibility?isVisible=${query.status}`,
      config
    )
);
