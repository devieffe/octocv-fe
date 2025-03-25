import { createSlice } from "@reduxjs/toolkit";
import { questions as initialQuestions } from "../data/questions";
import { questions2 as initialQuestions2 } from "../data/questions2";

const initialState = {
  questions: initialQuestions,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  completed: false,
};

const initialState2 = {
  questions: initialQuestions2,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  completed: false,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState: {
    ...initialState,
    questionnaire2: initialState2, // Add the second questionnaire state
  },
  reducers: {
    // Actions for both questionnaires
    answerQuestion: (state, action) => {
      const { answer, questionnaireId } = action.payload;

      if (questionnaireId === 1) {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        state.answers.push({
          questionId: currentQuestion.id,
          answer,
        });

        if (answer === currentQuestion.correctAnswer) {
          state.score += 1;
        }

        if (state.currentQuestionIndex + 1 < state.questions.length) {
          state.currentQuestionIndex += 1;
        } else {
          state.completed = true;
        }
      } else if (questionnaireId === 2) {
        const currentQuestion = state.questionnaire2.questions[state.questionnaire2.currentQuestionIndex];
        state.questionnaire2.answers.push({
          questionId: currentQuestion.id,
          answer,
        });

        if (answer === currentQuestion.correctAnswer) {
          state.questionnaire2.score += 1;
        }

        if (state.questionnaire2.currentQuestionIndex + 1 < state.questionnaire2.questions.length) {
          state.questionnaire2.currentQuestionIndex += 1;
        } else {
          state.questionnaire2.completed = true;
        }
      }
    },

    resetQuiz: (state, action) => {
      const { questionnaireId } = action.payload;

      if (questionnaireId === 1) {
        state.currentQuestionIndex = 0;
        state.answers = [];
        state.score = 0;
        state.completed = false;
      } else if (questionnaireId === 2) {
        state.questionnaire2.currentQuestionIndex = 0;
        state.questionnaire2.answers = [];
        state.questionnaire2.score = 0;
        state.questionnaire2.completed = false;
      }
    },
  },
});

export const { answerQuestion, resetQuiz } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
