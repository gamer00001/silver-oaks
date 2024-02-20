import { createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../actions/coursesActions";

const initialState = {
  coursesData: {
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
    builder.addCase(getCourses.pending, (state) => {
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
  },
});

export const courseReducer = courseSlice.reducer;
