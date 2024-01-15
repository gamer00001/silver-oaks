import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSubscriptions = asyncCatch(
  "subscriptionSlice/getAllSubscriptions",
  async ({ page = 1, query, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/subscriptions?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteSubscription = asyncCatch(
  "subscriptionSlice/deleteSubscription",
  async ({ _id, config }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/subscriptions/${_id}`,
      config
    )
);

export const exportSubscription = asyncCatch(
  "subscriptionSlice/exportSubscription",
  async ({ config }) =>
    axios.post(
      `${CONSTANTS.VITE_BACKEND_API_URL}/subscriptions/export`,
      null,
      config
    )
);

const initialState = {
  getAllSubscriptionsData: {
    data: [],
    totalPages: 0,
    loading: false,
  },

  deleteSubscriptionData: {
    loading: false,
  },

  exportSubscriptionData: {
    loading: false,
  },
};

const subscriptionSlice = createSlice({
  name: "subscriptionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all subscription
    builder.addCase(getAllSubscriptions.pending, (state) => {
      state.getAllSubscriptionsData.loading = true;
    });
    builder.addCase(getAllSubscriptions.fulfilled, (state, { payload }) => {
      state.getAllSubscriptionsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllSubscriptions.rejected, (state) => {
      state.getAllSubscriptionsData = {
        loading: false,
      };
    });

    // delete subscription
    builder.addCase(deleteSubscription.pending, (state) => {
      state.deleteSubscriptionData = {
        loading: true,
      };
    });
    builder.addCase(deleteSubscription.fulfilled, (state) => {
      state.deleteSubscriptionData = {
        loading: false,
      };
    });
    builder.addCase(deleteSubscription.rejected, (state) => {
      state.deleteSubscriptionData = {
        loading: false,
      };
    });

    // export subscription
    builder.addCase(exportSubscription.pending, (state) => {
      state.exportSubscriptionData = {
        loading: true,
      };
    });
    builder.addCase(exportSubscription.fulfilled, (state) => {
      state.exportSubscriptionData = {
        loading: false,
      };
    });
    builder.addCase(exportSubscription.rejected, (state) => {
      state.exportSubscriptionData = {
        loading: false,
      };
    });
  },
});

// export const {  } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
