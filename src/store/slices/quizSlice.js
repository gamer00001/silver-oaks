import { createSlice } from "@reduxjs/toolkit";
import { getQuizById, getQuizzes } from "../actions/quizzesActions";

const initialState = {
  quizzesData: {
    loading: false,
    data: null,
  },
  singleQuizData: {
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

    builder.addCase(getQuizById.pending, (state) => {
      state.singleQuizData = {
        ...initialState.singleQuizData,
        loading: true,
      };
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.singleQuizData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getQuizById.rejected, (state) => {
      state.singleQuizData = {
        ...initialState.singleQuizData,
        loading: false,
      };
    });
  },
});

export const quizReducer = quizSlice.reducer;
