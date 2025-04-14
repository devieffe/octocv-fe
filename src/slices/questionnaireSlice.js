import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [
    {
      text: "What is the capital of (1)?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
  ],
  currentQuestionIndex: 0,
  completed: false,
  answers: [],
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { answer } = action.payload;
      state.answers.push(answer);

      if (state.currentQuestionIndex + 1 < state.questions.length) {
        state.currentQuestionIndex += 1;
      } else {
        state.completed = true;
      }
    },
  },
});

export const { answerQuestion } = questionnaireSlice.actions; 
export default questionnaireSlice.reducer;
