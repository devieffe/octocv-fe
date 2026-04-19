import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Authenticate from "./components/Authenticate";
import StaffRoute from "./components/routes/StaffRoute";
import MakeCv from "./components/MakeCv";
import BlankPage from "./components/BlankPage";
import QuestionnaireIntro from "./components/Questionnaire/QuestionnaireIntro";
import QuestionnaireFlow from "./components/Questionnaire/QuestionnaireFlow";
import ProblemSolvingTest from "./components/Questionnaire/ProblemSolvingTest";
import MotivationalSurvey from "./components/Questionnaire/MotivationalSurvey";
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/Admin/admin-dashboard";
import AdminToolsDashboard from "./components/Admin/AdminToolsDashboard";
import AdminUserDetail from "./components/Admin/AdminUserDetail";
import CareerPath from "./components/user/CareerPath";
import NotFound from "./components/404";
import ComputerLiteracyTest from "./components/Questionnaire/ComputerLiteracyTest";
import VerifyEmail from "./components/user/verify_emails/VerifyEmail";
import ResendVerification from "./components/user/verify_emails/ResendVerification";
import Settings from "./components/user/Settings";
import AppLayout from "./components/DashboardLayout";
import CookieBanner from "./components/CookieBanner";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="/signup"               element={<SignUp />} />
          <Route path="/login"                element={<LogIn />} />
          <Route path="/verify-email"         element={<VerifyEmail />} />
          <Route path="/resend-verification"  element={<ResendVerification />} />
          <Route path="/authenticate"         element={<Authenticate />} />
          <Route path="/blank"                element={<BlankPage />} />
          <Route path="/onboarding"           element={<QuestionnaireIntro />} />
          <Route path="/unauthorized"         element={
            <div role="alert" className="flex items-center justify-center min-h-[60vh] text-red-400 text-lg font-semibold">
              Access denied. You are not authorised to view this page.
            </div>
          } />
          <Route path="*" element={<NotFound />} />

          {/* Protected user routes */}
          <Route path="/user"              element={<UserDashboard />} />
          <Route path="/make"              element={<MakeCv />} />
          <Route path="/careerpath"        element={<CareerPath />} />
          <Route path="/questionnaire"     element={<QuestionnaireFlow />} />
          <Route path="/problemsolvingtest"  element={<ProblemSolvingTest />} />
          <Route path="/computerliteracytest" element={<ComputerLiteracyTest />} />
          <Route path="/motivationalsurvey" element={<MotivationalSurvey />} />
          <Route path="/settings"          element={<Settings />} />

          {/* Staff-only routes */}
          <Route path="/admin"           element={<StaffRoute><AdminDashboard /></StaffRoute>} />
          <Route path="/admin/tools"     element={<StaffRoute><AdminToolsDashboard /></StaffRoute>} />
          <Route path="/admin/user/:id"  element={<StaffRoute><AdminUserDetail /></StaffRoute>} />
        </Route>
      </Routes>

      {/* GDPR cookie banner — rendered outside Routes so it persists across navigation */}
      <CookieBanner />
    </Router>
  );
};

export default App;
