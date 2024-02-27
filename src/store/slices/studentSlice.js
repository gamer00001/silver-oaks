import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStudentDashboardInfo,
  fetchStudentInfo,
} from "../actions/studentActions";

const initialState = {
  studentData: {
    loading: false,
    data: null,
  },
  studentDashboardData: {
    loading: false,
    data: null,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get dashboard data
    builder.addCase(fetchStudentInfo.pending, (state) => {
      state.studentData = {
        ...initialState.studentData,
        loading: true,
      };
    });
    builder.addCase(fetchStudentInfo.fulfilled, (state, action) => {
      state.studentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchStudentInfo.rejected, (state) => {
      state.studentData = {
        ...initialState.studentData,
        loading: false,
      };
    });

    builder.addCase(fetchStudentDashboardInfo.pending, (state) => {
      state.studentDashboardData = {
        ...initialState.studentDashboardData,
        loading: true,
      };
    });
    builder.addCase(fetchStudentDashboardInfo.fulfilled, (state, action) => {
      state.studentDashboardData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchStudentDashboardInfo.rejected, (state) => {
      state.studentDashboardData = {
        ...initialState.studentDashboardData,
        loading: false,
      };
    });
  },
});

export const studentReducer = studentSlice.reducer;
