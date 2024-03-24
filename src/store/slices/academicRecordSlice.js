import { createSlice } from "@reduxjs/toolkit";
import { getAssesments } from "../actions/assesmentActions";
import { getAcademicRecord } from "../actions/academicRecord";

const initialState = {
  academicRecordData: {
    loading: false,
    data: null,
  },
};

const academicRecordSlice = createSlice({
  name: "academicRecord",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get assesments
    builder.addCase(getAcademicRecord.pending, (state) => {
      state.academicRecordData = {
        ...initialState.academicRecordData,
        loading: true,
      };
    });
    builder.addCase(getAcademicRecord.fulfilled, (state, action) => {
      state.academicRecordData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAcademicRecord.rejected, (state) => {
      state.academicRecordData = {
        ...initialState.academicRecordData,
        loading: false,
      };
    });
  },
});

export const academicRecordReducer = academicRecordSlice.reducer;
