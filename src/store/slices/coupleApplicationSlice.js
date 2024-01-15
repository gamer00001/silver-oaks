import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCoupleBookings = asyncCatch(
  "coupleApplicationSlice/getAllCoupleBookings",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/couple-tour?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteCoupleBooking = asyncCatch(
  "coupleApplicationSlice/deleteCoupleBooking",
  async ({ _id, config }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/couple-tour/${_id}`,
      config
    )
);

export const updateCoupleBooking = asyncCatch(
  "coupleApplicationSlice/updateCoupleBooking",
  async ({ _id, config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/booking-form/couple-tour/${_id}`,
      body,
      config
    )
);

const initialState = {
  getAllCoupleBookingsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deleteCoupleBookingData: { loading: false },

  updateCoupleBookingData: {
    loading: false,
  },
};

const coupleApplicationSlice = createSlice({
  name: "coupleApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all tailor booking
    builder.addCase(getAllCoupleBookings.pending, (state) => {
      state.getAllCoupleBookingsData.loading = true;
    });
    builder.addCase(getAllCoupleBookings.fulfilled, (state, { payload }) => {
      state.getAllCoupleBookingsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllCoupleBookings.rejected, (state) => {
      state.getAllCoupleBookingsData.loading = false;
    });

    // delete tailor booking
    builder.addCase(deleteCoupleBooking.pending, (state) => {
      state.deleteCoupleBookingData.loading = true;
    });
    builder.addCase(deleteCoupleBooking.fulfilled, (state) => {
      state.deleteCoupleBookingData.loading = false;
    });
    builder.addCase(deleteCoupleBooking.rejected, (state) => {
      state.deleteCoupleBookingData.loading = false;
    });

    // update tailor booking
    builder.addCase(updateCoupleBooking.pending, (state) => {
      state.updateCoupleBookingData.loading = true;
    });
    builder.addCase(updateCoupleBooking.fulfilled, (state) => {
      state.updateCoupleBookingData.loading = false;
    });
    builder.addCase(updateCoupleBooking.rejected, (state) => {
      state.updateCoupleBookingData.loading = false;
    });
  },
});

// export const {  } = coupleApplicationSlice.actions;
export default coupleApplicationSlice.reducer;
