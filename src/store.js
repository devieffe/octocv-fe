import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authSlice";
import cvReducer from "./slices/cvSlice";
import questionnaireReducer from "./slices/questionnaireSlice";

// Configure persistence for auth only
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "refreshToken", "isAuthenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Final store config
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cv: cvReducer,
    questionnaire: questionnaireReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);
