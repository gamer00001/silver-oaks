import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPlanMyTripBookings = asyncCatch(
  "planMyTripApplicationSlice/getAllPlanMyTripBookings",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/planmytrip?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deletePlanMyTripBooking = asyncCatch(
  "planMyTripApplicationSlice/deletePlanMyTripBooking",
  async ({ _id, config }) =>
    axios.delete(`${CONSTANTS.VITE_BACKEND_API_URL}/planmytrip/${_id}`, config)
);

export const updatePlanMyTripBooking = asyncCatch(
  "planMyTripApplicationSlice/updatePlanMyTripBooking",
  async ({ _id, config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/planmytrip/${_id}`,
      body,
      config
    )
);

const initialState = {
  getAllPlanMyTripBookingsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deletePlanMyTripBookingData: { loading: false },

  updatePlanMyTripBookingData: {
    loading: false,
  },
};

const planMyTripApplicationSlice = createSlice({
  name: "planMyTripApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all tailor booking
    builder.addCase(getAllPlanMyTripBookings.pending, (state) => {
      state.getAllPlanMyTripBookingsData.loading = true;
    });
    builder.addCase(
      getAllPlanMyTripBookings.fulfilled,
      (state, { payload }) => {
        state.getAllPlanMyTripBookingsData = {
          loading: false,
          data: payload?.data || [],
          totalPages: payload?.totalPages || 0,
        };
      }
    );
    builder.addCase(getAllPlanMyTripBookings.rejected, (state) => {
      state.getAllPlanMyTripBookingsData.loading = false;
    });

    // delete tailor booking
    builder.addCase(deletePlanMyTripBooking.pending, (state) => {
      state.deletePlanMyTripBookingData.loading = true;
    });
    builder.addCase(deletePlanMyTripBooking.fulfilled, (state) => {
      state.deletePlanMyTripBookingData.loading = false;
    });
    builder.addCase(deletePlanMyTripBooking.rejected, (state) => {
      state.deletePlanMyTripBookingData.loading = false;
    });

    // update tailor booking
    builder.addCase(updatePlanMyTripBooking.pending, (state) => {
      state.updatePlanMyTripBookingData.loading = true;
    });
    builder.addCase(updatePlanMyTripBooking.fulfilled, (state) => {
      state.updatePlanMyTripBookingData.loading = false;
    });
    builder.addCase(updatePlanMyTripBooking.rejected, (state) => {
      state.updatePlanMyTripBookingData.loading = false;
    });
  },
});

// export const {  } = planMyTripApplicationSlice.actions;
export default planMyTripApplicationSlice.reducer;
