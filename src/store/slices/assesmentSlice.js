import { createSlice } from "@reduxjs/toolkit";
import { getAssesments } from "../actions/assesmentActions";

const initialState = {
  assesmentsData: {
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
  },
});

export const assesmentReducer = assesmentSlice.reducer;
