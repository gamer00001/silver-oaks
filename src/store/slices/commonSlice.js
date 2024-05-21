import { createSlice } from "@reduxjs/toolkit";
import { fetchCampuses } from "../actions/commonActions";

const initialState = {
  campusesData: {
    loading: false,
    data: null,
  },
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get course
    builder.addCase(fetchCampuses?.pending, (state) => {
      state.campusesData = {
        ...initialState.campusesData,
        loading: true,
      };
    });
    builder.addCase(fetchCampuses.fulfilled, (state, action) => {
      state.campusesData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchCampuses.rejected, (state) => {
      state.campusesData = {
        ...initialState.campusesData,
        loading: false,
      };
    });
  },
});

export const commonReducer = commonSlice.reducer;
