import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTailorBookings = asyncCatch(
  "tailorApplicationSlice/getAllTailorBookings",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${
        CONSTANTS.VITE_BACKEND_API_URL
      }/booking-form/tailor-made-tour?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteTailorBooking = asyncCatch(
  "tailorApplicationSlice/deleteTailorBooking",
  async ({ _id, config }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/tailor-made-tour/${_id}`,
      config
    )
);

export const updateTailorBooking = asyncCatch(
  "tailorApplicationSlice/updateTailorBooking",
  async ({ _id, config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/tailor-made-tour/${_id}`,
      body,
      config
    )
);

const initialState = {
  getAllTailorBookingsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deleteTailorBookingData: { loading: false },

  updateTailorBookingData: {
    loading: false,
  },
};

const tailorApplicationSlice = createSlice({
  name: "tailorApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all tailor booking
    builder.addCase(getAllTailorBookings.pending, (state) => {
      state.getAllTailorBookingsData.loading = true;
    });
    builder.addCase(getAllTailorBookings.fulfilled, (state, { payload }) => {
      state.getAllTailorBookingsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllTailorBookings.rejected, (state) => {
      state.getAllTailorBookingsData.loading = false;
    });

    // delete tailor booking
    builder.addCase(deleteTailorBooking.pending, (state) => {
      state.deleteTailorBookingData.loading = true;
    });
    builder.addCase(deleteTailorBooking.fulfilled, (state) => {
      state.deleteTailorBookingData.loading = false;
    });
    builder.addCase(deleteTailorBooking.rejected, (state) => {
      state.deleteTailorBookingData.loading = false;
    });

    // update tailor booking
    builder.addCase(updateTailorBooking.pending, (state) => {
      state.updateTailorBookingData.loading = true;
    });
    builder.addCase(updateTailorBooking.fulfilled, (state) => {
      state.updateTailorBookingData.loading = false;
    });
    builder.addCase(updateTailorBooking.rejected, (state) => {
      state.updateTailorBookingData.loading = false;
    });
  },
});

// export const {  } = tailorApplicationSlice.actions;
export default tailorApplicationSlice.reducer;
