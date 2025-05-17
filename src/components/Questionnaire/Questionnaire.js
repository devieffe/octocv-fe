import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; 

const Questionnaire = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizId = "quiz2"; 
  const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);

  const [answers, setAnswers] = useState([]); 

  useEffect(() => {
    if (quiz?.completed) {
      submitAnswers(); 
    }
  }, [quiz?.completed, answers]); 

  if (!quiz || !quiz.questions) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  const { questions, currentQuestionIndex, completed } = quiz;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (optionLabel) => {
    dispatch(answerQuestion({ quizId, answer: optionLabel }));
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = optionLabel.toUpperCase();
      return updated;
    });
  };  

  const submitAnswers = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await axiosInstance.post(
        "/api/submit-logic-test/",
        {
          responses: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/announce2");
      } else {
        console.error("Error submitting test:", response.status);
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      if (error.response) {
        if (error.response.status === 400) {
          alert("Validation Error: " + error.response.data.error);
        } else if (error.response.status === 403) {
          alert("You have already taken this test.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="max-w-lg w-full space-y-6">
        {!completed ? (
          <>
            <h2 className="text-3xl font-bold text-blue-950 text-center">
              Question {currentQuestionIndex + 1}:
            </h2>
            <h3 className="text-2xl text-center text-gray-800">
              {currentQuestion.text}
            </h3>

            <div className="mt-6 space-y-4">
  {currentQuestion.options.map((optionLabel, index) => {
    const optionText = currentQuestion.optionMap[optionLabel];
    const isSelected =
      answers[currentQuestionIndex] === optionLabel.toUpperCase();

    return (
      <div
        key={index}
        onClick={() => handleAnswerClick(optionLabel)}
        className={`cursor-pointer w-full p-4 rounded-lg border shadow transition text-center text-lg
          ${
            isSelected
              ? "bg-red-100 border-red-500 text-red-700 font-semibold"
              : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-800"
          }
        `}
      >
        {optionText}
      </div>
    );
  })}
</div>

          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-950 text-center">
              Quiz Completed!
            </h2>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition mt-4"
              onClick={() => navigate("/user")}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
