import { configureStore } from "@reduxjs/toolkit";
import {
  ogaReducer,
  quizReducer,
  authReducer,
  courseReducer,
  teacherReducer,
  eventReducer,
  lectureReducer,
  studentReducer,
  assesmentReducer,
  dashboardReducer,
  assignmentReducer,
  academicRecordReducer,
} from "./slices";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "authReducer",
  storage: storage,
};

const store = configureStore({
  reducer: {
    authReducer: persistReducer(authPersistConfig, authReducer),
    courseReducer,
    dashboardReducer,
    eventReducer,
    lectureReducer,
    quizReducer,
    ogaReducer,
    teacherReducer,
    assignmentReducer,
    assesmentReducer,
    studentReducer,
    academicRecordReducer,
  },
});

export default store;
export const persistedStore = persistStore(store);
