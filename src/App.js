
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Authenticate from "./components/Authenticate";
import CandidateDashboard from "./components/CandidateDashboard";
import BlankPage from "./components/BlankPage";
import Questionnaire from "./components/Questionnaire";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import NotFound from './components/404';


const App = () => {
  const year = new Date().getFullYear();
  return (
    <Router>
      <div className="h-full flex flex-col">

        <header className="bg-blue-500 text-white p-4">
          <Navbar />
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/dashboarduser" element={<CandidateDashboard />} />
            <Route path="/blank" element={<BlankPage />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="container-fluid p-4">{year} OctoCV</footer>
      </div>

    </Router>
  );
};

export default App;
