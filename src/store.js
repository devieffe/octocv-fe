import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cvReducer from "./slices/cvSlice";
import questionnaireReducer from "./slices/questionnaireSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questionnaire: questionnaireReducer,
    cv: cvReducer,

  },
});