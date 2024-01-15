import { createSlice } from "@reduxjs/toolkit";
import { addDestinations, deleteDestinations, editDestinations, getDestination, getDestinations } from "../actions/destinationsActions"; 

const initialState = {
  destinationsData: {
    loading: false,
    data: null,
    currentPage: 1,
    totalPages: 10,
  },
  createDestinationsData: {
  loading: false,
  isDestinationAdded: false
  },
  deleteDestinationsData: {
    loading: false,
  },

  destinationData: {
    loading: false,
    data: null
  },
  editDestinationData: {
    loading: false,
    data: null
  }

};

const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //get destinations
    builder.addCase(getDestinations.pending, (state) => {
      state.destinationsData = {
        ...initialState.destinationsData,
        loading: true
      };
    });
    builder.addCase(getDestinations.fulfilled, (state, action) => {
      state.destinationsData = {
        loading: false,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        data: action.payload.data,
      };
    });
    builder.addCase(getDestinations.rejected, (state) => {
      state.destinationsData = {
        ...initialState.destinationsData,
        loading: false
      };
    });

      //add destinations

      builder.addCase(addDestinations.pending, (state) => {
      state.createDestinationsData = {
        ...initialState.createDestinationsData,
        loading: true
      };
    });
    builder.addCase(addDestinations.fulfilled, (state) => {
      state.createDestinationsData = {
        loading: false,
        isDestinationAdded: true
      };
    });
    builder.addCase(addDestinations.rejected, (state) => {
      state.createDestinationsData = {
        ...initialState.createDestinationsData,
        loading: false,
        isDestinationAdded: false
      };
    });

     //delete destinations
     builder.addCase(deleteDestinations.pending, (state) => {
      state.deleteDestinationsData = {
        ...initialState.deleteDestinationsData,
        loading: true
      };
    });
    builder.addCase(deleteDestinations.fulfilled, (state, action) => {
      state.deleteDestinationsData = {
        loading: false,
      };
    });
    builder.addCase(deleteDestinations.rejected, (state) => {
      state.deleteDestinationsData = {
        ...initialState.deleteDestinationsData,
        loading: false
      };
    });

     //get destination
     builder.addCase(getDestination.pending, (state) => {
      state.destinationData = {
        ...initialState.destinationData,
        loading: true
      };
    });
    builder.addCase(getDestination.fulfilled, (state, action) => {
      state.destinationData = {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(getDestination.rejected, (state) => {
      state.destinationData = {
        ...initialState.destinationData,
        loading: false
      };
    });

     //edit destination
     builder.addCase(editDestinations.pending, (state) => {
      state.editDestinationData = {
        ...initialState.editDestinationData,
        loading: true
      };
    });
    builder.addCase(editDestinations.fulfilled, (state, action) => {
      state.editDestinationData = {
        loading: false,
        data: action.payload.data,
      };
    });
    builder.addCase(editDestinations.rejected, (state) => {
      state.editDestinationData = {
        ...initialState.editDestinationData,
        loading: false
      };
    });
    
  },
});

export const destinationsReducer = destinationsSlice.reducer;
