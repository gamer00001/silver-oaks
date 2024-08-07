import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { useDispatch } from "react-redux";

import { handleError } from "@/utils/errorHandling";

export const getLectures = asyncCatch(
  "lectureSlice/getLectures",
  async ({ config, query, dispatch }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/by-course/${
          query.courseId
        }${query?.queryParams ?? ""}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error, dispatch);
      })
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

export const addLecture = asyncCatch(
  "lectureSlice/addLecture",
  async ({ config, query, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures`, body)
);

export const updateLecture = asyncCatch(
  "lectureSlice/updateLecture",
  async ({ config, query, body }) =>
    axios.put(`${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures`, body)
);

export const deleteLecture = asyncCatch(
  "lectureSlice/deleteLecture",
  async ({ config, query, body }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/${query.lectureId}`
    )
);
