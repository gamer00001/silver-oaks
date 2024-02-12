import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  courseReducer,
  dashboardReducer,
  eventReducer
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
    eventReducer
  },
});

export default store;
export const persistedStore = persistStore(store);
