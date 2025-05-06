import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireQuestionnaire = ({ children, quizId = "quiz1" }) => {
    const quiz = useSelector((state) => state.questionnaire.quizzes[quizId]);
  
    if (!quiz?.completed) {
      return <Navigate to="/announce1" replace />;
    }
  
    return children;
  };

export default RequireQuestionnaire;
