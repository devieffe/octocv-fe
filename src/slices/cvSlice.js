import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careerPath: "",
  questionnaireAnswers: {},
  aiGeneratedCV: null,
  isProcessing: false,
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCareerPath: (state, action) => {
      state.careerPath = action.payload;
    },
    setQuestionnaireAnswers: (state, action) => {
      state.questionnaireAnswers = action.payload;
    },
    setProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setAiGeneratedCV: (state, action) => {
      state.aiGeneratedCV = action.payload;
      state.isProcessing = false;
    },
  },
});

export const { setCareerPath, setQuestionnaireAnswers, setProcessing, setAiGeneratedCV } = cvSlice.actions;
export default cvSlice.reducer;