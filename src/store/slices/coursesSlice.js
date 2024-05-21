import { createSlice } from "@reduxjs/toolkit";
import { getAllCoursesByGrade, getCourses } from "../actions/coursesActions";

const initialState = {
  coursesData: {
    loading: false,
    data: null,
  },
  coursesListing: {
    loading: false,
    data: null,
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get course
    builder.addCase(getCourses?.pending, (state) => {
      state.coursesData = {
        ...initialState.coursesData,
        loading: true,
      };
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.coursesData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getCourses.rejected, (state) => {
      state.coursesData = {
        ...initialState.coursesData,
        loading: false,
      };
    });

    //get all courses by grade
    builder.addCase(getAllCoursesByGrade?.pending, (state) => {
      state.coursesListing = {
        ...initialState.coursesListing,
        loading: true,
      };
    });
    builder.addCase(getAllCoursesByGrade.fulfilled, (state, action) => {
      state.coursesListing = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAllCoursesByGrade.rejected, (state) => {
      state.coursesListing = {
        ...initialState.coursesListing,
        loading: false,
      };
    });
  },
});

export const courseReducer = courseSlice.reducer;
