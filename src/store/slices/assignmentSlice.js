import { createSlice } from "@reduxjs/toolkit";
import {
  createAssignment,
  getAssignmentById,
  getAssignmentSubmission,
  getAssignmentSubmissions,
  getAssignments,
  getAssignmentsByCourseId,
  markAssignment,
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
  assignmentSubmissionsData: {
    loading: false,
    data: null,
  },
  submissionData: {
    loading: false,
    data: null,
  },
  markAssignmentData: {
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

    //get asssignments by Id
    builder.addCase(getAssignmentsByCourseId.pending, (state) => {
      state.assignmentsData = {
        ...initialState.assignmentsData,
        loading: true,
      };
    });
    builder.addCase(getAssignmentsByCourseId.fulfilled, (state, action) => {
      state.assignmentsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssignmentsByCourseId.rejected, (state) => {
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

    //get asssignment submissions
    builder.addCase(getAssignmentSubmissions.pending, (state) => {
      state.assignmentSubmissionsData = {
        ...initialState.assignmentSubmissionsData,
        loading: true,
      };
    });
    builder.addCase(getAssignmentSubmissions.fulfilled, (state, action) => {
      state.assignmentSubmissionsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssignmentSubmissions.rejected, (state) => {
      state.assignmentSubmissionsData = {
        ...initialState.assignmentSubmissionsData,
        loading: false,
      };
    });

    //get asssignment submission
    builder.addCase(getAssignmentSubmission.pending, (state) => {
      state.submissionData = {
        ...initialState.submissionData,
        loading: true,
      };
    });
    builder.addCase(getAssignmentSubmission.fulfilled, (state, action) => {
      state.submissionData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getAssignmentSubmission.rejected, (state) => {
      state.submissionData = {
        ...initialState.submissionData,
        loading: false,
      };
    });

    //mark assignment
    builder.addCase(markAssignment.pending, (state) => {
      state.markAssignmentData = {
        ...initialState.markAssignmentData,
        loading: true,
      };
    });
    builder.addCase(markAssignment.fulfilled, (state, action) => {
      state.markAssignmentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(markAssignment.rejected, (state) => {
      state.markAssignmentData = {
        ...initialState.markAssignmentData,
        loading: false,
      };
    });
  },
});

export const assignmentReducer = assignmentSlice.reducer;
