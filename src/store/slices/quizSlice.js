import { createSlice } from "@reduxjs/toolkit";
import { getQuizzes } from "../actions/quizzesActions";

const initialState = {
  quizzesData: {
    loading: false,
    data: null,
  },
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get quizzes
    builder.addCase(getQuizzes.pending, (state) => {
      state.quizzesData = {
        ...initialState.quizzesData,
        loading: true,
      };
    });
    builder.addCase(getQuizzes.fulfilled, (state, action) => {
      state.quizzesData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getQuizzes.rejected, (state) => {
      state.quizzesData = {
        ...initialState.quizzesData,
        loading: false,
      };
    });
  },
});

export const quizReducer = quizSlice.reducer;
