import { createSlice } from "@reduxjs/toolkit";

import { fetchTeachersListing } from "../actions/teacherActions";

const initialState = {
  teachersListing: {
    loading: false,
    data: null,
  },
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch All Teachers
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
  },
});

export const teacherReducer = teacherSlice.reducer;
