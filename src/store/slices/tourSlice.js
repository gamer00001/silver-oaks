import { createSlice } from "@reduxjs/toolkit";
import {
  addTours,
  deleteTour,
  editTour,
  getTour,
  getTours,
} from "../actions/tourActions";

const initialState = {
  toursData: {
    loading: false,
    data: null,
    currentPage: 1,
    totalPages: 10,
  },
  createTourData: {
    loading: false,
    isDestinationAdded: false,
  },
  deleteTourData: {
    loading: false,
  },

  tourData: {
    loading: false,
    data: null,
  },
  
  editTourData: {
    loading: false,
    data: null,
  },
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //get tours
    builder.addCase(getTours.pending, (state) => {
      state.toursData = {
        ...initialState.toursData,
        loading: true,
      };
    });
    builder.addCase(getTours.fulfilled, (state, action) => {
      state.toursData = {
        loading: false,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        data: action.payload.data,
      };
    });
    builder.addCase(getTours.rejected, (state) => {
      state.toursData = {
        ...initialState.toursData,
        loading: false,
      };
    });

    //add tours

    builder.addCase(addTours.pending, (state) => {
      state.createTourData = {
        ...initialState.createTourData,
        loading: true,
      };
    });
    builder.addCase(addTours.fulfilled, (state) => {
      state.createTourData = {
        loading: false,
        isTourAdded: true,
      };
    });
    builder.addCase(addTours.rejected, (state) => {
      state.createTourData = {
        ...initialState.createTourData,
        loading: false,
        isTourAdded: false,
      };
    });
      

      //delete tour
      builder.addCase(deleteTour.pending, (state) => {
        state.deleteTourData = {
          ...initialState.deleteTourData,
          loading: true,
        };
      });
      builder.addCase(deleteTour.fulfilled, (state, action) => {
        state.deleteTourData = {
          loading: false,
        };
      });
      builder.addCase(deleteTour.rejected, (state) => {
        state.deleteTourData = {
          ...initialState.deleteTourData,
          loading: false,
        };
      });


      //get tour
      builder.addCase(getTour.pending, (state) => {
        state.tourData = {
          ...initialState.tourData,
          loading: true,
        };
      });
      builder.addCase(getTour.fulfilled, (state, action) => {
        state.tourData = {
          loading: false,
          data: action.payload,
        };
      });
      builder.addCase(getTour.rejected, (state) => {
        state.tourData = {
          ...initialState.tourData,
          loading: false,
        };
      });
    

      //edit tour
      builder.addCase(editTour.pending, (state) => {
        state.editTourData = {
          ...initialState.editTourData,
          loading: true,
        };
      });
      builder.addCase(editTour.fulfilled, (state, action) => {
        state.editTourData = {
          loading: false,
          data: action.payload.data,
        };
      });
      builder.addCase(editTour.rejected, (state) => {
        state.editTourData = {
          ...initialState.editTourData,
          loading: false,
        };
      });
    
  },
});

export const tourReducer = tourSlice.reducer;
