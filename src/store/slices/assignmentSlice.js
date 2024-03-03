import { createSlice } from "@reduxjs/toolkit";
import {
  createAssignment,
  getAssignmentById,
  getAssignments,
} from "../actions/assignmentsActions";

const initialState = {
  createAssignmentData: {
    loading: false,
    data: null,
  },
  assignmentsData: {
    loading: false,
    data: null,
  },
  singleAssignmentData: {
    loading: false,
    data: null,
  },
};

const assignmentSlice = createSlice({
  name: "asssignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create asssignments
    builder.addCase(createAssignment.pending, (state) => {
      state.createAssignmentData = {
        ...initialState.createAssignmentData,
        loading: true,
      };
    });
    builder.addCase(createAssignment.fulfilled, (state, action) => {
      state.createAssignmentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(createAssignment.rejected, (state) => {
      state.createAssignmentData = {
        ...initialState.createAssignmentData,
        loading: false,
      };
    });

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

    //get asssignment By ID
    builder.addCase(getAssignmentById.pending, (state) => {
      state.singleAssignmentData = {
        ...initialState.singleAssignmentData,
        loading: true,
      };
    });
    builder.addCase(getAssignmentById.fulfilled, (state, action) => {
      state.singleAssignmentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssignmentById.rejected, (state) => {
      state.singleAssignmentData = {
        ...initialState.singleAssignmentData,
        loading: false,
      };
    });
  },
});

export const assignmentReducer = assignmentSlice.reducer;
