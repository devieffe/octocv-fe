import { createSlice } from "@reduxjs/toolkit";
import questionsData from "../assets/Questionnaire/questions.json";

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

      if (!quiz || quiz.completed) return;

      const index = quiz.currentQuestionIndex;
      const currentQuestion = quiz.questions[index];
      const hasCorrectAnswer = currentQuestion.hasOwnProperty("correctAnswer");
      const isCorrect = hasCorrectAnswer ? answer === currentQuestion.correctAnswer : true;

      // Ensure the answers array has consistent indexing
      quiz.answers[index] = { answer, isCorrect };

      // Progress to next question or mark as completed
      if (index + 1 < quiz.questions.length) {
        quiz.currentQuestionIndex += 1;
      } else {
        quiz.completed = true;
        quiz.readyForNextChapter = hasCorrectAnswer
          ? quiz.answers.every((a) => a?.isCorrect)
          : true;
      }
    },

    resetQuiz: (state, action) => {
      const { quizId } = action.payload;
      const quiz = state.quizzes[quizId];
      if (quiz) {
        quiz.currentQuestionIndex = 0;
        quiz.completed = false;
        quiz.answers = [];
        quiz.readyForNextChapter = false;
      }
    },
  },
});

export const { answerQuestion, resetQuiz } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;