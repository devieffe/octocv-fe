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
import Questionnaire from "./components/Questionnaire/Questionnaire";
// import RequireQuestionnaire from "./components/Questionnaire/RequireQuestionnaire";
import MotivationalSurvey from "./components/Questionnaire/MotivationalSurvey";
import AdminDashboard from "./components/user/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import NotFound from "./components/404";
import Announce from "./components/Questionnaire/Announce";
import Announce1 from "./components/Questionnaire/Announce1";
import Announce2 from "./components/Questionnaire/Announce2";
import Questionnaire2 from "./components/Questionnaire/Questionnaire2";
import VerifyEmail from "./components/user/verify_emails/VerifyEmail";
import ResendVerification from "./components/user/verify_emails/ResendVerification";
import Settings from "./components/user/Settings";

const App = () => {
  const year = new Date().getFullYear();

  return (
    <Router>
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
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/announce" element={<Announce />} />
            <Route path="/announce1" element={<Announce1 />} />
            <Route path="/announce2" element={<Announce2 />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/questionnaire2" element={<Questionnaire2 />} />
            <Route path="/motivationalsurvey" element={<MotivationalSurvey />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/make" element={<MakeCv />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="text-center py-4 border-t border-gray-300 text-sm text-blue-950">
          © {year} OctoCV
        </footer>
      </div>
    </Router>
  );
};

export default App;
