import { createSlice } from "@reduxjs/toolkit";
import {
  changeLectureStatus,
  getLectureReportTable,
  getLectures,
} from "../actions/lecturesActions";

const initialState = {
  lecturesData: {
    loading: false,
    data: null,
  },
  lectureReportTableData: {
    loading: false,
    data: null,
  },
  lectureStatusData: {
    loading: false,
    data: null,
  },
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get lecture
    builder.addCase(getLectures.pending, (state) => {
      state.lecturesData = {
        ...initialState.lecturesData,
        loading: true,
      };
    });
    builder.addCase(getLectures.fulfilled, (state, action) => {
      state.lecturesData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getLectures.rejected, (state) => {
      state.lecturesData = {
        ...initialState.lecturesData,
        loading: false,
      };
    });

    builder.addCase(getLectureReportTable.pending, (state) => {
      state.lectureReportTableData = {
        ...initialState.lectureReportTableData,
        loading: true,
      };
    });
    builder.addCase(getLectureReportTable.fulfilled, (state, action) => {
      state.lectureReportTableData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getLectureReportTable.rejected, (state) => {
      state.lectureReportTableData = {
        ...initialState.lectureReportTableData,
        loading: false,
      };
    });

    builder.addCase(changeLectureStatus.pending, (state) => {
      state.lectureStatusData = {
        ...initialState.lectureStatusData,
        loading: true,
      };
    });
    builder.addCase(changeLectureStatus.fulfilled, (state, action) => {
      state.lectureStatusData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(changeLectureStatus.rejected, (state) => {
      state.lectureStatusData = {
        ...initialState.lectureStatusData,
        loading: false,
      };
    });
  },
});

export const lectureReducer = lectureSlice.reducer;
