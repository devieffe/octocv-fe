// ../../slices/questionnaireSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Example questions for questionnaire 2
const initialQuestions = [
  {
    text: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris', // Optional if you plan to score
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  // Add more questions here...
];

const initialState = {
  questionnaire2: {
    questions: initialQuestions,
    currentQuestionIndex: 0,
    completed: false,
    answers: [],
    // score: 0, // Optional if you want to include scoring
  },
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { answer, questionnaireId } = action.payload;
      const questionnaireKey = `questionnaire${questionnaireId}`;
      const questionnaire = state[questionnaireKey];

      if (!questionnaire || questionnaire.completed) return;

      questionnaire.answers.push(answer);

      if (questionnaire.currentQuestionIndex + 1 < questionnaire.questions.length) {
        questionnaire.currentQuestionIndex += 1;
      } else {
        questionnaire.completed = true;

        // Optional scoring logic:
        // const score = questionnaire.answers.reduce((total, ans, i) =>
        //   ans === questionnaire.questions[i].correctAnswer ? total + 1 : total
        // , 0);
        // questionnaire.score = score;
      }
    },
  },
});

export const { answerQuestion } = questionnaireSlice.actions;
export default questionnaireSlice.reducer;
