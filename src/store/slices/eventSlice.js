import { createSlice } from "@reduxjs/toolkit";
import { addEvent } from "../actions/eventActions";


const initialState = {
    addEventData: {
      loading: false,
      data: null
    }
}

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    //add event
    builder.addCase(addEvent.pending, (state) => {
        state.addEventData = {
          ...initialState.addEventData,
          loading: true,
        };
      });
      builder.addCase(addEvent.fulfilled, (state, action) => {
        state.addEventData = {
          loading: false,
          data: action.payload,
        };
      });
      builder.addCase(addEvent.rejected, (state) => {
        state.addEventData = {
          ...initialState.addEventData,
          loading: false,
        };
      });
    },
});

export const eventReducer = eventSlice.reducer;