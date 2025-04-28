// questionnaireSlice.js
import { createSlice } from "@reduxjs/toolkit";
import questionsData from '../assets/Questionnaire/questions.json'; 

const initialState = {
  quizzes: questionsData, 
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { quizId, answer } = action.payload;
      const quiz = state.quizzes[quizId];
      const currentQuestion = quiz.questions[quiz.currentQuestionIndex];
      const isCorrect = answer === currentQuestion.correctAnswer;

      quiz.answers.push({ answer, isCorrect });

      if (quiz.currentQuestionIndex + 1 < quiz.questions.length) {
        quiz.currentQuestionIndex += 1;
      } else {
        quiz.completed = true;
        quiz.readyForNextChapter = quiz.answers.every((a) => a.isCorrect);
      }
    },
    resetQuiz: (state, action) => {
      const { quizId } = action.payload;
      const quiz = state.quizzes[quizId];
      quiz.currentQuestionIndex = 0;
      quiz.completed = false;
      quiz.answers = [];
      quiz.readyForNextChapter = false;
    },
  },
});

export const { answerQuestion, resetQuiz } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
