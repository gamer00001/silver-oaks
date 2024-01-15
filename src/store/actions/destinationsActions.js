import { asyncCatch } from "@/utils";
import { convertObjectToQueryString } from "@/utils";
import axios from "axios";
import { CONSTANTS } from "@/constants";

export const getDestinations = asyncCatch(
  "destinationsSlice/getDestinations",
  async ({ page = 1, query }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/destination?sortBy=-updatedAt&page=${page}${
        query ? `&query=${query}` : ""
      }`
    )
);

export const addDestinations = asyncCatch(
  "destinationsSlice/addDestinations",
  async ({ config, data }) => {
    data.featuredTourName = data.featureTourDetails.title;
    delete data.featureTourName;
    delete data.featureTourDetails;
    console.log(data)
    return axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/destination`,
      data,
      config
    );
  }
);

export const deleteDestinations = asyncCatch(
  "destinationsSlice/deleteDestinations",
  async ({ config, queryParams }) =>
    axios.delete(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/destination/${queryParams}`,
      config
    )
);

export const getDestination = asyncCatch(
  "destinationSlice/getDestination",
  async ({ queryParams }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/destination/${queryParams}`
    )
);

export const editDestinations = asyncCatch(
  "destinationsSlice/editDestinations",
  async ({ data }) => {
    data.featuredTourName = data.featureTourDetails.title;
    delete data.featureTourName;
    delete data.featureTourDetails;
    return axios.patch(
      `${CONSTANTS.VITE_BACKEND_API_URL}/destination/${data.id}`,
      data,
      config
    );
  }
);

