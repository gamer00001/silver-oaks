import { createSlice } from "@reduxjs/toolkit";
import { getDashboardData } from "../actions/dashboardActions";


const initialState = {
    dashboardData: {
      loading: false,
      data: null
    }
}

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
    },
});

export const dashboardReducer = dashboardSlice.reducer;