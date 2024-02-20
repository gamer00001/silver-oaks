import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  courseReducer,
  dashboardReducer,
  eventReducer,
  lectureReducer,
  quizReducer,
  assignmentReducer,
  assesmentReducer,
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
    assignmentReducer,
    assesmentReducer,
  },
});

export default store;
export const persistedStore = persistStore(store);
