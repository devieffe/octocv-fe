// questionnaireSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: {
    quiz1: {
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
        }
      ],
      currentQuestionIndex: 0,
      completed: false,
      answers: [],
      readyForNextChapter: false,
    },
    quiz2: {
      questions: [
        {
          text: "What is (3)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "3",
        },
        {
          text: "What is (4)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "4",
        }
      ],
      currentQuestionIndex: 0,
      completed: false,
      answers: [],
      readyForNextChapter: false,
    },
  },
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
