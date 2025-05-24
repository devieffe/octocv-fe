import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/HomePage";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Authenticate from "./components/Authenticate";
import MakeCv from "./components/MakeCv";
import BlankPage from "./components/BlankPage";
import QuestionnaireIntro from "./components/Questionnaire/QuestionnaireIntro";
import QuestionnaireFlow from "./components/Questionnaire/QuestionnaireFlow";
import ProblemSolvingTest from "./components/Questionnaire/ProblemSolvingTest";
import MotivationalSurvey from "./components/Questionnaire/MotivationalSurvey";
import UserDashboard from "./components/user/UserDashboard";
import CareerPath from "./components/user/CareerPath";
import NotFound from "./components/404";
import ComputerLiteracyTest from "./components/Questionnaire/ComputerLiteracyTest";
import VerifyEmail from "./components/user/verify_emails/VerifyEmail";
import ResendVerification from "./components/user/verify_emails/ResendVerification";
import Settings from "./components/user/Settings";

const App = () => {
  const year = new Date().getFullYear();

  return (
    <Router>
      <div className="relative bg-white bg-cv-pattern">
      <div className="min-h-screen flex flex-col bg-white">
        <header>
          <Navbar />
        </header>
        <main className="main-content container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/resend-verification"element={<ResendVerification />}/>
            <Route path="/login" element={<LogIn />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/blank" element={<BlankPage />} />
            <Route path="/onboarding" element={<QuestionnaireIntro />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/questionnaire" element={<QuestionnaireFlow />} />
            <Route path="/problemsolvingtest" element={<ProblemSolvingTest/>} />
            <Route path="/computerliteracytest" element={<ComputerLiteracyTest />} />
            <Route path="/motivationalsurvey" element={<MotivationalSurvey />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/make" element={<MakeCv />} />
            <Route path="/careerpath" element={<CareerPath />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="text-center py-4 border-t border-gray-300 text-sm text-blue-950">
          © {year} OctoCV
        </footer>
        </div>
        </div>
    </Router>
  );
};

export default App;
