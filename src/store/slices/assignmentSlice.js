import { createSlice } from "@reduxjs/toolkit";
import { getAssignments } from "../actions/assignmentsActions";

const initialState = {
  assignmentsData: {
    loading: false,
    data: null,
  },
};

const assignmentSlice = createSlice({
  name: "asssignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get asssignments
    builder.addCase(getAssignments.pending, (state) => {
      state.assignmentsData = {
        ...initialState.assignmentsData,
        loading: true,
      };
    });
    builder.addCase(getAssignments.fulfilled, (state, action) => {
      state.assignmentsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssignments.rejected, (state) => {
      state.assignmentsData = {
        ...initialState.assignmentsData,
        loading: false,
      };
    });
  },
});

export const assignmentReducer = assignmentSlice.reducer;
