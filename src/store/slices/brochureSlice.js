import { createSlice } from "@reduxjs/toolkit";
import { addBrochure, deleteBrochure, editBrochure, getBrochure, getBrochures } from "../actions/brouchureActions"; 

const initialState = {
  brochuresData: {
    loading: false,
    data: null,
    currentPage: 1,
    totalPages: 10,
  },
  createBrochuresData: {
  loading: false,
  isBrochureAdded: false
  },
  deleteBrochuresData: {
    loading: false,
  },

  brochureData: {
    loading: false,
    data: null
  },
  editBrochureData: {
    loading: false,
    data: null
  }

};

const brochuresSlice = createSlice({
  name: "brochures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //get brochures
    builder.addCase(getBrochures.pending, (state) => {
      state.brochuresData = {
        ...initialState.brochuresData,
        loading: true
      };
    });
    builder.addCase(getBrochures.fulfilled, (state, action) => {
        state.brochuresData = {
            loading: false,
            currentPage: action.payload.currentPage,
            totalPages: action.payload.totalPages,
            data: action.payload.data,
        };
    });
    builder.addCase(getBrochures.rejected, (state) => {
      state.brochuresData = {
        ...initialState.brochuresData,
        loading: false
      };
    });

      //add brochure

      builder.addCase(addBrochure.pending, (state) => {
      state.createBrochuresData = {
        ...initialState.createBrochuresData,
        loading: true
      };
    });
    builder.addCase(addBrochure.fulfilled, (state) => {
      state.createBrochuresData = {
        loading: false,
        isBrochureAdded: true
      };
    });
    builder.addCase(addBrochure.rejected, (state) => {
      state.createBrochuresData = {
        ...initialState.createBrochuresData,
        loading: false,
        isBrochureAdded: false
      };
    });

     //delete brochure
     builder.addCase(deleteBrochure.pending, (state) => {
      state.deleteBrochuresData = {
        ...initialState.deleteBrochuresData,
        loading: true
      };
    });
    builder.addCase(deleteBrochure.fulfilled, (state, action) => {
      state.deleteBrochuresData = {
        loading: false,
      };
    });
    builder.addCase(deleteBrochure.rejected, (state) => {
      state.deleteBrochuresData = {
        ...initialState.deleteBrochuresData,
        loading: false
      };
    });

     //get brochure
     builder.addCase(getBrochure.pending, (state) => {
      state.brochureData = {
        ...initialState.brochureData,
        loading: true
      };
    });
    builder.addCase(getBrochure.fulfilled, (state, action) => {
      state.brochureData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getBrochure.rejected, (state) => {
      state.brochureData = {
        ...initialState.brochureData,
        loading: false
      };
    });
    
    //edit brochure
    builder.addCase(editBrochure.pending, (state) => {
        state.editBrochureData = {
          ...initialState.editBrochureData,
          loading: true
        };
      });
      builder.addCase(editBrochure.fulfilled, (state, action) => {
        state.editBrochureData = {
          loading: false,
          data: action.payload,
        };
      });
      builder.addCase(editBrochure.rejected, (state) => {
        state.editBrochureData = {
          ...initialState.editBrochureData,
          loading: false
        };
      });
  },
});

export const brochuresReducer = brochuresSlice.reducer;
