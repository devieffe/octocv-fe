import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cvReducer from "./slices/cvSlice";
import questionnaireReducer from "./slices/questionnaireSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cv: cvReducer,
    questionnaire: questionnaireReducer // <-- this key must match what you're selecting
  },
});