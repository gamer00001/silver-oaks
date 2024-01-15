import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGroupBookings = asyncCatch(
  "groupApplicationSlice/getAllGroupBookings",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/group-tour?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteGroupBooking = asyncCatch(
  "groupApplicationSlice/deleteGroupBooking",
  async ({ _id, config }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/group-tour/${_id}`,
      config
    )
);

export const updateGroupBooking = asyncCatch(
  "groupApplicationSlice/updateGroupBooking",
  async ({ _id, config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/group-tour/${_id}`,
      body,
      config
    )
);

const initialState = {
  getAllGroupBookingsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deleteGroupBookingData: { loading: false },

  updateGroupBookingData: {
    loading: false,
  },
};

const groupApplicationSlice = createSlice({
  name: "groupApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all tailor booking
    builder.addCase(getAllGroupBookings.pending, (state) => {
      state.getAllGroupBookingsData.loading = true;
    });
    builder.addCase(getAllGroupBookings.fulfilled, (state, { payload }) => {
      state.getAllGroupBookingsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllGroupBookings.rejected, (state) => {
      state.getAllGroupBookingsData.loading = false;
    });

    // delete tailor booking
    builder.addCase(deleteGroupBooking.pending, (state) => {
      state.deleteGroupBookingData.loading = true;
    });
    builder.addCase(deleteGroupBooking.fulfilled, (state) => {
      state.deleteGroupBookingData.loading = false;
    });
    builder.addCase(deleteGroupBooking.rejected, (state) => {
      state.deleteGroupBookingData.loading = false;
    });

    // update tailor booking
    builder.addCase(updateGroupBooking.pending, (state) => {
      state.updateGroupBookingData.loading = true;
    });
    builder.addCase(updateGroupBooking.fulfilled, (state) => {
      state.updateGroupBookingData.loading = false;
    });
    builder.addCase(updateGroupBooking.rejected, (state) => {
      state.updateGroupBookingData.loading = false;
    });
  },
});

// export const {  } = groupApplicationSlice.actions;
export default groupApplicationSlice.reducer;
