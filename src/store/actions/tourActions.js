import { asyncCatch } from "@/utils";
import { convertObjectToQueryString } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getTours = asyncCatch(
  "tourSlice/getTours",
  async ({ page = 1, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/tours?sortBy=-updatedAt&page=${page}${
        query ? `&query=${query}` : ""
      }`
    )
);

export const addTours = asyncCatch("tourSlice/addTours", async ({ config, data }) => {
  console.log(data);
  if (data.type === "couple") {
    return axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/couple-tours`, data, config);
  } else if (data.type === "group") {
    return axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/group-tours`, data, config);
  } else if (data.type === "tailor") {
    return axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/tailor-made-tours`,
      data,
      config
    );
  }
});

export const deleteTour = asyncCatch(
  "tourSlice/deleteTour",
  async ({ config, queryParams }) => {
    if (queryParams.type === "couple") {
      return axios.delete(
        `${CONSTANTS.VITE_BACKEND_API_URL}/couple-tours/${queryParams.id}`, config
      );
    } else if (queryParams.type === "group") {
      return axios.delete(
        `${CONSTANTS.VITE_BACKEND_API_URL}/group-tours/${queryParams.id}`, config
      );
    } else if (queryParams.type === "tailor") {
      return axios.delete(
        `${CONSTANTS.VITE_BACKEND_API_URL}/tailor-made-tours/${queryParams.id}`, config
      );
    }
  }
);

export const getTour = asyncCatch(
  "tourSlice/getTour",
  async ({ queryParams }) => {
    if (queryParams.type === "couple")
      return axios.get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/couple-tours/${queryParams.id}`
      );
    else if (queryParams.type === "group")
      return axios.get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/group-tours/${queryParams.id}`
      );
    else if (queryParams.type === "tailor")
      return axios.get(
        `${CONSTANTS.VITE_BACKEND_API_URL}/tailor-made-tours/${queryParams.id}`
      );
  }
);

export const editTour = asyncCatch("tourSlice/editTour", async ({ config, data }) => {
  if (data.type === "couple") {
    return axios.patch(
      `${CONSTANTS.VITE_BACKEND_API_URL}/couple-tours/${data.id}`,
      data,
      config
    );
  } else if (data.type === "group") {
    return axios.patch(
      `${CONSTANTS.VITE_BACKEND_API_URL}/group-tours/${data.id}`,
      data,
      config
    );
  } else if (data.type === "tailor") {
    return axios.patch(
      `${CONSTANTS.VITE_BACKEND_API_URL}/tailor-made-tours/${data.id}`,
      data,
      config
    );
  }
});
