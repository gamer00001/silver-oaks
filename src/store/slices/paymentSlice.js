import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPayments = asyncCatch(
  "paymentSlice/getAllPayments",
  async ({ config, page = 1, query }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/receipt?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deletePayment = asyncCatch(
  "paymentSlice/deletePayment",
  async ({ config, _id }) =>
    axios.delete(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/receipt/${_id}`,
      config
    )
);

export const createPayment = asyncCatch(
  "paymentSlice/createPayment",
  async ({ config, body }) =>
    axios.post(`${CONSTANTS.VITE_BACKEND_API_URL}/admin/receipt`, body, config)
);

export const checkPaymentStatus = asyncCatch(
  "paymentSlice/checkPaymentStatus",
  async ({ config, _id }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/admin/receipt/status/${_id}`,
      config
    )
);

const initialState = {
  getAllPaymentsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deletePaymentData: {
    loading: false,
  },

  createPaymentData: {
    loading: false,
  },

  checkPaymentStatusData: {
    loading: false,
  },
};

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all payments
    builder.addCase(getAllPayments.pending, (state) => {
      state.getAllPaymentsData.loading = true;
    });
    builder.addCase(getAllPayments.fulfilled, (state, { payload }) => {
      state.getAllPaymentsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllPayments.rejected, (state) => {
      state.getAllPaymentsData.loading = false;
    });

    // delete payment
    builder.addCase(deletePayment.pending, (state) => {
      state.deletePaymentData.loading = true;
    });
    builder.addCase(deletePayment.fulfilled, (state) => {
      state.deletePaymentData.loading = false;
    });
    builder.addCase(deletePayment.rejected, (state) => {
      state.deletePaymentData.loading = false;
    });

    // create payment
    builder.addCase(createPayment.pending, (state) => {
      state.createPaymentData.loading = true;
    });
    builder.addCase(createPayment.fulfilled, (state) => {
      state.createPaymentData.loading = false;
    });
    builder.addCase(createPayment.rejected, (state) => {
      state.createPaymentData.loading = false;
    });

    // Check payment status
    builder.addCase(checkPaymentStatus.pending, (state) => {
      state.checkPaymentStatusData.loading = true;
    });
    builder.addCase(checkPaymentStatus.fulfilled, (state) => {
      state.checkPaymentStatusData.loading = false;
    });
    builder.addCase(checkPaymentStatus.rejected, (state) => {
      state.checkPaymentStatusData.loading = false;
    });
  },
});

// export const {  } = paymentSlice.actions;
export default paymentSlice.reducer;
