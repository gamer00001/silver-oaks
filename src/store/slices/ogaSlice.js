import { createSlice } from "@reduxjs/toolkit";
import {
  getOnGoingAssigmentById,
  getOnGoingAssignmentsByCourseListing,
  getOnGoingAssignmentsListing,
} from "../actions/ogaActions";

const initialState = {
  ogaListingData: {
    loading: false,
    data: null,
  },
  ogaListingByCourseData: {
    loading: false,
    data: null,
  },
  assesmentData: {
    loading: false,
    data: null,
  },
};

const ogaSlice = createSlice({
  name: "onGoingAsssignment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get on going asssignments
    builder.addCase(getOnGoingAssignmentsListing.pending, (state) => {
      state.ogaListingData = {
        ...initialState.ogaListingData,
        loading: true,
      };
    });
    builder.addCase(getOnGoingAssignmentsListing.fulfilled, (state, action) => {
      state.ogaListingData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getOnGoingAssignmentsListing.rejected, (state) => {
      state.ogaListingData = {
        ...initialState.ogaListingData,
        loading: false,
      };
    });

    //get on going asssignments by Course
    builder.addCase(getOnGoingAssignmentsByCourseListing.pending, (state) => {
      state.ogaListingByCourseData = {
        ...initialState.ogaListingByCourseData,
        loading: true,
      };
    });
    builder.addCase(
      getOnGoingAssignmentsByCourseListing.fulfilled,
      (state, action) => {
        state.ogaListingByCourseData = {
          loading: false,
          data: action.payload,
        };
      }
    );
    builder.addCase(getOnGoingAssignmentsByCourseListing.rejected, (state) => {
      state.ogaListingByCourseData = {
        ...initialState.ogaListingByCourseData,
        loading: false,
      };
    });

    //get asssignment By ID
    builder.addCase(getOnGoingAssigmentById.pending, (state) => {
      state.assesmentData = {
        ...initialState.assesmentData,
        loading: true,
      };
    });
    builder.addCase(getOnGoingAssigmentById.fulfilled, (state, action) => {
      state.assesmentData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getOnGoingAssigmentById.rejected, (state) => {
      state.assesmentData = {
        ...initialState.assesmentData,
        loading: false,
      };
    });
  },
});

export const ogaReducer = ogaSlice.reducer;
