import { createSlice } from "@reduxjs/toolkit";
import { addEvent, getEvents } from "../actions/eventActions";

const initialState = {
  addEventData: {
    loading: false,
    data: null,
  },
  getEventsData: {
    loading: false,
    data: null,
  },
};

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

    builder.addCase(getEvents.pending, (state) => {
      state.getEventsData = {
        ...initialState.getEventsData,
        loading: true,
      };
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.getEventsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getEvents.rejected, (state) => {
      state.getEventsData = {
        ...initialState.getEventsData,
        loading: false,
      };
    });
  },
});

export const eventReducer = eventSlice.reducer;
