import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import MotivationSurvey from "./MotivationalSurvey";
import ComputerLiteracyTest from "./ComputerLiteracyTest";
import ProblemSolvingTest from "./ProblemSolvingTest";
import { Loader } from "lucide-react";

const QuestionnaireFlow = () => {
  const [status, setStatus] = useState(null);
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
      if (newStatus.every(Boolean)) navigate("/user");
    } catch (err) {
      console.error("Error refreshing status", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader size={20} className="animate-spin" />
        <span className="text-sm">Loading assessment...</span>
      </div>
    </div>
  );

  const renderCurrentTest = () => {
    if (!status[0]) return <MotivationSurvey onComplete={updateStatus} />;
    if (!status[1]) return <ComputerLiteracyTest onComplete={updateStatus} />;
    if (!status[2]) return <ProblemSolvingTest onComplete={updateStatus} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {renderCurrentTest()}
    </div>
  );
};

export default QuestionnaireFlow;
