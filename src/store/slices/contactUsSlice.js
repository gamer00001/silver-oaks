import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllContactUs = asyncCatch(
  "contactUsSlice/getAllContactUs",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/contactus?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteContactUs = asyncCatch(
  "contactUsSlice/deleteContactUs",
  async ({ _id, config }) =>
    axios.delete(`${CONSTANTS.VITE_BACKEND_API_URL}/contactus/${_id}`, config)
);

const initialState = {
  getAllContactUsData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deleteContactUsData: {
    loading: false,
  },
};

const contactUsSlice = createSlice({
  name: "contactUsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all contact us
    builder.addCase(getAllContactUs.pending, (state) => {
      state.getAllContactUsData.loading = true;
    });
    builder.addCase(getAllContactUs.fulfilled, (state, { payload }) => {
      state.getAllContactUsData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllContactUs.rejected, (state) => {
      state.getAllContactUsData.loading = false;
    });

    // delete contact us
    builder.addCase(deleteContactUs.pending, (state) => {
      state.deleteContactUsData.loading = true;
    });
    builder.addCase(deleteContactUs.fulfilled, (state) => {
      state.deleteContactUsData.loading = false;
    });
    builder.addCase(deleteContactUs.rejected, (state) => {
      state.deleteContactUsData.loading = false;
    });
  },
});

// export const {  } = contactUsSlice.actions;
export default contactUsSlice.reducer;
