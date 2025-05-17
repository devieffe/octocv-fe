import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../../slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; 

const Questionnaire2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizId = "quiz2"; 
  const quiz2 = useSelector((state) => state.questionnaire.quizzes[quizId]);

  const [answers, setAnswers] = useState([]); 

  useEffect(() => {
    if (quiz2?.completed) {
      submitAnswers(); 
    }
  }, [quiz2?.completed, answers]); 

  if (!quiz2 || !quiz2.questions) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  const { questions, currentQuestionIndex, completed } = quiz2;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (optionKey) => {
    dispatch(answerQuestion({ answer: optionKey, quizId }));
    setAnswers((prevAnswers) => {
      const updated = [...prevAnswers];
      updated[currentQuestionIndex] = optionKey.toUpperCase();
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
  {currentQuestion.options.map((key, index) => (
    <div
      key={index}
      onClick={() => handleAnswerClick(key)}
      className={`cursor-pointer p-4 rounded-lg shadow-md border text-center
        ${
          answers[currentQuestionIndex] === key.toUpperCase()
            ? "bg-red-100 border-red-600 text-red-700 font-semibold"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }
      `}
    >
      {currentQuestion.optionMap[key]}
    </div>
  ))}
</div>

          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-950 text-center">
              Quiz Completed!
            </h2>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:bg-red-700 transition mt-4"
              onClick={() => navigate('/user')}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Questionnaire2;
