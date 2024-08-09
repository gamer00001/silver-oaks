import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStudentDashboardInfo,
  fetchStudentInfo,
  fetchStudentsListing,
  fetchStudentsListingByFilterApi,
  fetchTeacherAcademicRecord,
} from "../actions/studentActions";

const initialState = {
  studentData: {
    loading: false,
    data: null,
  },
  studentDashboardData: {
    loading: false,
    data: null,
  },
  studentAcademicRecords: {
    loading: false,
    data: null,
  },
  studentsListing: {
    loading: false,
    data: null,
  },
  filteredStudentsListing: {
    loading: false,
    data: null,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get dashboard data
    builder.addCase(fetchStudentInfo.pending, (state) => {
      state.studentData = {
        ...initialState.studentData,
        loading: true,
      };
    });
    builder.addCase(fetchStudentInfo.fulfilled, (state, action) => {
      state.studentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchStudentInfo.rejected, (state) => {
      state.studentData = {
        ...initialState.studentData,
        loading: false,
      };
    });

    //Student Dashboard info
    builder.addCase(fetchStudentDashboardInfo.pending, (state) => {
      state.studentDashboardData = {
        ...initialState.studentDashboardData,
        loading: true,
      };
    });
    builder.addCase(fetchStudentDashboardInfo.fulfilled, (state, action) => {
      state.studentDashboardData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchStudentDashboardInfo.rejected, (state) => {
      state.studentDashboardData = {
        ...initialState.studentDashboardData,
        loading: false,
      };
    });
    //Student Record Dashboard info
    builder.addCase(fetchTeacherAcademicRecord.pending, (state) => {
      state.studentAcademicRecords = {
        ...initialState.studentAcademicRecords,
        loading: true,
      };
    });
    builder.addCase(fetchTeacherAcademicRecord.fulfilled, (state, action) => {
      state.studentAcademicRecords = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchTeacherAcademicRecord.rejected, (state) => {
      state.studentAcademicRecords = {
        ...initialState.studentAcademicRecords,
        loading: false,
      };
    });

    //Fetch All Students
    builder.addCase(fetchStudentsListing.pending, (state) => {
      state.studentsListing = {
        ...initialState.studentsListing,
        loading: true,
      };
    });
    builder.addCase(fetchStudentsListing.fulfilled, (state, action) => {
      state.studentsListing = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(fetchStudentsListing.rejected, (state) => {
      state.studentsListing = {
        ...initialState.studentsListing,
        loading: false,
      };
    });

    //Fetch All Students
    builder.addCase(fetchStudentsListingByFilterApi.pending, (state) => {
      state.filteredStudentsListing = {
        ...initialState.filteredStudentsListing,
        loading: true,
      };
    });
    builder.addCase(
      fetchStudentsListingByFilterApi.fulfilled,
      (state, action) => {
        state.filteredStudentsListing = {
          loading: false,
          data: action.payload,
        };
      }
    );
    builder.addCase(fetchStudentsListingByFilterApi.rejected, (state) => {
      state.filteredStudentsListing = {
        ...initialState.filteredStudentsListing,
        loading: false,
      };
    });
  },
});

export const studentReducer = studentSlice.reducer;
