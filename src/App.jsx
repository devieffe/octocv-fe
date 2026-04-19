import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/HomePage";
import AuthModal from "./components/AuthModal";
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

// Landing page + modal rendered together (direct URL access e.g. paste /login)
const HomeWithModal = ({ type }) => (
  <>
    <Home />
    <AuthModal type={type} />
  </>
);

// Inner component — must be inside <Router> to use useLocation
const AppRoutes = () => {
  const location = useLocation();
  // When navigating from the landing page with background state, keep that page
  // rendered behind the modal instead of re-mounting HomePage
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        {/* Public landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth modal routes — show landing page as background on direct URL access */}
        <Route path="/login"  element={<HomeWithModal type="login"  />} />
        <Route path="/signup" element={<HomeWithModal type="signup" />} />

        <Route element={<AppLayout />}>
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
          <Route path="/user"               element={<UserDashboard />} />
          <Route path="/make"               element={<MakeCv />} />
          <Route path="/careerpath"         element={<CareerPath />} />
          <Route path="/questionnaire"      element={<QuestionnaireFlow />} />
          <Route path="/problemsolvingtest"   element={<ProblemSolvingTest />} />
          <Route path="/computerliteracytest" element={<ComputerLiteracyTest />} />
          <Route path="/motivationalsurvey"   element={<MotivationalSurvey />} />
          <Route path="/settings"           element={<Settings />} />

          {/* Staff-only routes */}
          <Route path="/admin"          element={<StaffRoute><AdminDashboard /></StaffRoute>} />
          <Route path="/admin/tools"    element={<StaffRoute><AdminToolsDashboard /></StaffRoute>} />
          <Route path="/admin/user/:id" element={<StaffRoute><AdminUserDetail /></StaffRoute>} />
        </Route>
      </Routes>

      {/* Modal layer — rendered on top when navigating with background location state */}
      {backgroundLocation && (
        <Routes>
          <Route path="/login"  element={<AuthModal type="login"  />} />
          <Route path="/signup" element={<AuthModal type="signup" />} />
        </Routes>
      )}

      {/* GDPR cookie banner */}
      <CookieBanner />
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
