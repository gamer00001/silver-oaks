import { asyncCatch } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";
import { handleError } from "@/utils/errorHandling";

export const getAcademicRecord = asyncCatch(
  "academicRecordSlice/getAcademicRecord",
  async ({ config, query }) =>
    axios
      .get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/academic-record?academicCategory=${query.academicCategory}&page=${query.page}&size=${query.size}&studentRollNumber=${query.studentRollNumber}&term=${query.term}`,
        config
      )
      .then((resp) => resp)
      .catch((error) => {
        handleError(error);
      })
);
