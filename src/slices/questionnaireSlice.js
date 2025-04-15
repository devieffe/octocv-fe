
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [
    {
      text: "What is (1)?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1",
    },
    {
      text: "What is (2)?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
  ],
  currentQuestionIndex: 0,
  completed: false,
  answers: [], // stores { answer, isCorrect }
  readyForNextChapter: false,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { answer } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;

      state.answers.push({ answer, isCorrect });

      if (state.currentQuestionIndex + 1 < state.questions.length) {
        state.currentQuestionIndex += 1;
      } else {
        state.completed = true;
        state.readyForNextChapter = state.answers.every((a) => a.isCorrect);
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.completed = false;
      state.answers = [];
      state.readyForNextChapter = false;
    },
  },
});

// ✅ Correct export — must be after questionnaireSlice is declared
export const { answerQuestion, resetQuiz } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
