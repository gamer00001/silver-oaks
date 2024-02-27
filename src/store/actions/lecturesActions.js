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
        `${CONSTANTS.VITE_BACKEND_API_URL}/v1/lectures/by-course/${query.courseId}`,
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
