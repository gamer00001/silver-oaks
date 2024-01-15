import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  uploadReducer,
  blogReducer,
  subscriptionReducer,
  paymentReducer,
  contactUsReducer,
  tailorApplicationReducer,
  planMyTripApplicationReducer,
  groupApplicationReducer,
  coupleApplicationReducer,
  invitationLetterApplicationReducer,
  tourReducer,
  destinationsReducer,
  brochuresReducer,
  statsReducer,
  courseReducer
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
    uploadReducer,
    blogReducer,
    subscriptionReducer,
    paymentReducer,
    contactUsReducer,
    tailorApplicationReducer,
    planMyTripApplicationReducer,
    groupApplicationReducer,
    coupleApplicationReducer,
    invitationLetterApplicationReducer,
    tourReducer,
    destinationsReducer,
    brochuresReducer,
    statsReducer,
    courseReducer
  },
});

export default store;
export const persistedStore = persistStore(store);
