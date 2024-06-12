import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAllTeachers,
  fetchTeachersListing,
} from "../actions/teacherActions";

const initialState = {
  teachersListing: {
    loading: false,
    data: null,
  },

  allTeachersListing: {
    loading: false,
    data: null,
  },
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch All Teachers By Campus

    builder.addCase(fetchTeachersListing.pending, (state) => {
      state.teachersListing = {
        ...initialState.teachersListing,
        loading: true,
      };
    });
    builder.addCase(fetchTeachersListing.fulfilled, (state, action) => {
      state.teachersListing = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchTeachersListing.rejected, (state) => {
      state.teachersListing = {
        ...initialState.teachersListing,
        loading: false,
      };
    });

    //Fetch All Teachers
    builder.addCase(fetchAllTeachers.pending, (state) => {
      state.allTeachersListing = {
        ...initialState.allTeachersListing,
        loading: true,
      };
    });
    builder.addCase(fetchAllTeachers.fulfilled, (state, action) => {
      state.allTeachersListing = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchAllTeachers.rejected, (state) => {
      state.allTeachersListing = {
        ...initialState.allTeachersListing,
        loading: false,
      };
    });
  },
});

export const teacherReducer = teacherSlice.reducer;
