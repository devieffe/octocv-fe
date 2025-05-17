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
    
      // Check if currentQuestion has a correctAnswer property
      const hasCorrectAnswer = currentQuestion.hasOwnProperty("correctAnswer");
    
      // Determine correctness only if correctAnswer exists
      const isCorrect = hasCorrectAnswer ? answer === currentQuestion.correctAnswer : true;
    
      quiz.answers.push({ answer, isCorrect });
    
      if (quiz.currentQuestionIndex + 1 < quiz.questions.length) {
        quiz.currentQuestionIndex += 1;
      } else {
        quiz.completed = true;
    
        // For quizzes: readyForNextChapter is true if all answers correct
        // For surveys: readyForNextChapter is true by default (or you can customize)
        quiz.readyForNextChapter = hasCorrectAnswer
          ? quiz.answers.every((a) => a.isCorrect)
          : true;
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
