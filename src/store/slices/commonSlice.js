import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCampuses,
  fetchExamsListing,
  fetchSectionsByCampus,
} from "../actions/commonActions";

const initialState = {
  campusesData: {
    loading: false,
    data: null,
  },

  sectionsData: {
    loading: false,
    data: null,
  },

  examsData: {
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

    //get Sections
    builder.addCase(fetchSectionsByCampus?.pending, (state) => {
      state.sectionsData = {
        ...initialState.sectionsData,
        loading: true,
      };
    });
    builder.addCase(fetchSectionsByCampus.fulfilled, (state, action) => {
      state.sectionsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchSectionsByCampus.rejected, (state) => {
      state.sectionsData = {
        ...initialState.sectionsData,
        loading: false,
      };
    });

    //get Exams
    builder.addCase(fetchExamsListing?.pending, (state) => {
      state.examsData = {
        ...initialState.examsData,
        loading: true,
      };
    });
    builder.addCase(fetchExamsListing.fulfilled, (state, action) => {
      state.examsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchExamsListing.rejected, (state) => {
      state.examsData = {
        ...initialState.examsData,
        loading: false,
      };
    });
  },
});

export const commonReducer = commonSlice.reducer;
