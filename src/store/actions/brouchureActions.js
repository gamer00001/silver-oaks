import { asyncCatch } from "@/utils";
import { convertObjectToQueryString } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getBrochures = asyncCatch(
  "brochuresSlice/getBrochures",
  async ({ page = 1, query }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/broucher?sortBy=-updatedAt&page=${page}${
        query ? `&query=${query}` : ""
      }`
    )
);

export const addBrochure = asyncCatch(
  "brochuresSlice/addBrochures",
  async ({ config, data }) => {
    return axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/broucher`,
      data,
      config
    );
  }
);

export const deleteBrochure = asyncCatch(
  "brochuresSlice/deleteBrochures",
  async ({ config, queryParams }) =>
    axios.delete(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/broucher/${queryParams}`,
      config
    )
);

export const getBrochure = asyncCatch(
  "brochuresSlice/getBrochure",
  async ({ queryParams }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/broucher/${queryParams}`
    )
);

export const editBrochure = asyncCatch(
    "brochureSlice/editBrochure",
    async ({ config, data }) => {
      return axios.patch(
        `${CONSTANTS.VITE_BACKEND_API_URL}/broucher/${data.id}`,
        data,
        config
      );
    }
  );

