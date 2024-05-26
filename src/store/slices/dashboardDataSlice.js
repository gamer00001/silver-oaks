import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminDashboardData,
  getDashboardData,
  getTeacherId,
} from "../actions/dashboardActions";

const initialState = {
  dashboardData: {
    loading: false,
    data: null,
  },

  adminDashboardData: {
    loading: false,
    data: null,
  },

  teacherIdData: {
    loading: false,
    data: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get dashboard data
    builder.addCase(getDashboardData.pending, (state) => {
      state.dashboardData = {
        ...initialState.dashboardData,
        loading: true,
      };
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.dashboardData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getDashboardData.rejected, (state) => {
      state.dashboardData = {
        ...initialState.dashboardData,
        loading: false,
      };
    });
    //get dashboard data
    builder.addCase(getTeacherId.pending, (state) => {
      state.teacherIdData = {
        ...initialState.teacherIdData,
        loading: true,
      };
    });
    builder.addCase(getTeacherId.fulfilled, (state, action) => {
      state.teacherIdData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getTeacherId.rejected, (state) => {
      state.teacherIdData = {
        ...initialState.teacherIdData,
        loading: false,
      };
    });

    //get Admin dashboard data
    builder.addCase(getAdminDashboardData.pending, (state) => {
      state.adminDashboardData = {
        ...initialState.adminDashboardData,
        loading: true,
      };
    });
    builder.addCase(getAdminDashboardData.fulfilled, (state, action) => {
      state.adminDashboardData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAdminDashboardData.rejected, (state) => {
      state.adminDashboardData = {
        ...initialState.adminDashboardData,
        loading: false,
      };
    });
  },
});

export const dashboardReducer = dashboardSlice.reducer;
