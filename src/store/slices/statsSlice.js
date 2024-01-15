import { createSlice } from "@reduxjs/toolkit";
import { getReport, getStatus } from "../actions";

const initialState = {
  statusData: {
    loading: false,
    data: null,
  },
  reportData: {
    loading: false,
    data: null,
  }
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //get status
    builder.addCase(getStatus.pending, (state) => {
      state.statusData = {
        ...initialState.statusData,
        loading: true,
      };
    });
    builder.addCase(getStatus.fulfilled, (state, action) => {
      state.statusData = {
        loading: false,
        data: action.payload.pieData,
      };
    });
    builder.addCase(getStatus.rejected, (state) => {
      state.statusData = {
        ...initialState.statusData,
        loading: false,
      };
    });

    //get report
    builder.addCase(getReport.pending, (state) => {
        state.reportData = {
          ...initialState.reportData,
          loading: true,
        };
      });
      builder.addCase(getReport.fulfilled, (state, action) => {
        state.reportData = {
          loading: false,
          data: action.payload,
        };
      });
      builder.addCase(getReport.rejected, (state) => {
        state.reportData = {
          ...initialState.reportData,
          loading: false,
        };
      });
    
  },
});

export const statsReducer = statsSlice.reducer;
