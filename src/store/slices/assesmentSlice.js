import { createSlice } from "@reduxjs/toolkit";
import { getAssesments, getExamById } from "../actions/assesmentActions";

const initialState = {
  assesmentsData: {
    loading: false,
    data: null,
  },
  singleExamData: {
    loading: false,
    data: null,
  },
};

const assesmentSlice = createSlice({
  name: "assesment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get assesments
    builder.addCase(getAssesments.pending, (state) => {
      state.assesmentsData = {
        ...initialState.assesmentsData,
        loading: true,
      };
    });
    builder.addCase(getAssesments.fulfilled, (state, action) => {
      state.assesmentsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssesments.rejected, (state) => {
      state.assesmentsData = {
        ...initialState.assesmentsData,
        loading: false,
      };
    });

    //get Exam by id
    builder.addCase(getExamById.pending, (state) => {
      state.singleExamData = {
        ...initialState.singleExamData,
        loading: true,
      };
    });
    builder.addCase(getExamById.fulfilled, (state, action) => {
      state.singleExamData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getExamById.rejected, (state) => {
      state.singleExamData = {
        ...initialState.singleExamData,
        loading: false,
      };
    });
  },
});

export const assesmentReducer = assesmentSlice.reducer;
