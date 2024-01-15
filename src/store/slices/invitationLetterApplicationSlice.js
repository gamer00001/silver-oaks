import { CONSTANTS } from "@/constants";
import { asyncCatch } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllInvitationLetter = asyncCatch(
  "invitationLetterApplicationSlice/getAllInvitationLetter",
  async ({ query, page = 1, config }) =>
    axios.get(
      `${CONSTANTS.VITE_BACKEND_API_URL}/invitation?page=${page}${
        query ? `&query=${query}` : ""
      }`,
      config
    )
);

export const deleteInvitationLetter = asyncCatch(
  "invitationLetterApplicationSlice/deleteInvitationLetter",
  async ({ _id, config }) =>
    axios.delete(`${CONSTANTS.VITE_BACKEND_API_URL}/invitation/${_id}`, config)
);

export const updateInvitationLetter = asyncCatch(
  "invitationLetterApplicationSlice/updateInvitationLetter",
  async ({ _id, config, body }) =>
    axios.put(
      `${CONSTANTS.VITE_BACKEND_API_URL}/invitation/${_id}`,
      body,
      config
    )
);

const initialState = {
  getAllInvitationLetterData: {
    loading: false,
    data: [],
    totalPages: 0,
  },

  deleteInvitationLetterData: { loading: false },

  updateInvitationLetterData: {
    loading: false,
  },
};

const invitationLetterApplicationSlice = createSlice({
  name: "invitationLetterApplicationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all tailor booking
    builder.addCase(getAllInvitationLetter.pending, (state) => {
      state.getAllInvitationLetterData.loading = true;
    });
    builder.addCase(getAllInvitationLetter.fulfilled, (state, { payload }) => {
      state.getAllInvitationLetterData = {
        loading: false,
        data: payload?.data || [],
        totalPages: payload?.totalPages || 0,
      };
    });
    builder.addCase(getAllInvitationLetter.rejected, (state) => {
      state.getAllInvitationLetterData.loading = false;
    });

    // delete tailor booking
    builder.addCase(deleteInvitationLetter.pending, (state) => {
      state.deleteInvitationLetterData.loading = true;
    });
    builder.addCase(deleteInvitationLetter.fulfilled, (state) => {
      state.deleteInvitationLetterData.loading = false;
    });
    builder.addCase(deleteInvitationLetter.rejected, (state) => {
      state.deleteInvitationLetterData.loading = false;
    });

    // update tailor booking
    builder.addCase(updateInvitationLetter.pending, (state) => {
      state.updateInvitationLetterData.loading = true;
    });
    builder.addCase(updateInvitationLetter.fulfilled, (state) => {
      state.updateInvitationLetterData.loading = false;
    });
    builder.addCase(updateInvitationLetter.rejected, (state) => {
      state.updateInvitationLetterData.loading = false;
    });
  },
});

// export const {  } = invitationLetterApplicationSlice.actions;
export default invitationLetterApplicationSlice.reducer;
