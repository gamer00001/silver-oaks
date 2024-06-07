import { createSlice } from "@reduxjs/toolkit";
import {
  getQuizById,
  getQuizSubmissions,
  getQuizzes,
  getQuizzesByCourseId,
} from "../actions/quizzesActions";

const initialState = {
  quizzesData: {
    loading: false,
    data: null,
  },
  singleQuizData: {
    loading: false,
    data: null,
  },
  quizSubmissionsData: {
    loading: false,
    data: null,
  },
  quizzesDataByCourse: {
    data: null,
    loading: false,
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

    builder.addCase(getQuizSubmissions.pending, (state) => {
      state.quizSubmissionsData = {
        ...initialState.quizSubmissionsData,
        loading: true,
      };
    });
    builder.addCase(getQuizSubmissions.fulfilled, (state, action) => {
      state.quizSubmissionsData = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getQuizSubmissions.rejected, (state) => {
      state.quizSubmissionsData = {
        ...initialState.quizSubmissionsData,
        loading: false,
      };
    });

    //Get Quizzes By Course ID
    builder.addCase(getQuizzesByCourseId.pending, (state) => {
      state.quizzesDataByCourse = {
        ...initialState.quizzesDataByCourse,
        loading: true,
      };
    });
    builder.addCase(getQuizzesByCourseId.fulfilled, (state, action) => {
      state.quizzesDataByCourse = {
        loading: false,
        data: action.payload,
      };
    });
    builder.addCase(getQuizzesByCourseId.rejected, (state) => {
      state.quizzesDataByCourse = {
        ...initialState.quizzesDataByCourse,
        loading: false,
      };
    });
  },
});

export const quizReducer = quizSlice.reducer;
