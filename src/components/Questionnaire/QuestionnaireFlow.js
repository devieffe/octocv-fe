import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import MotivationSurvey from "./MotivationalSurvey";
import ComputerLiteracyTest from "./ComputerLiteracyTest";
import ProblemSolvingTest from "./ProblemSolvingTest";

const QuestionnaireFlow = () => {
  const [status, setStatus] = useState(null); // [true, false, false]
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestStatus = async () => {
      try {
        const res = await axiosInstance.get("/api/passed-tests/", {
          headers: { "Content-Type": "application/json" },
        });
        setStatus(res.data.response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test status", err);
        navigate("/login");
      }
    };

    fetchTestStatus();
  }, [navigate]);

  const updateStatus = async () => {
    try {
      const res = await axiosInstance.get("/api/passed-tests/", {
        headers: { "Content-Type": "application/json" },
      });
      const newStatus = res.data.response;
      setStatus(newStatus);

      const allPassed = newStatus.every(Boolean);
      if (allPassed) {
        navigate("/user");
      }
    } catch (err) {
      console.error("Error refreshing status", err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading questionnaires...</div>;

  const renderCurrentTest = () => {
    if (!status[0]) return <MotivationSurvey onComplete={updateStatus} />;
    if (!status[1]) return <ComputerLiteracyTest onComplete={updateStatus} />;
    if (!status[2]) return <ProblemSolvingTest onComplete={updateStatus} />;
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {renderCurrentTest()}
    </div>
  );
};

export default QuestionnaireFlow;