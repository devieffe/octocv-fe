import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import Home from './Components/HomePage';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import AssessmentAnnounce1 from './Components/AssessmentAnnounce1';
import AssessmentQuestion1 from './Components/AssessmentQuestion1';
import AssessmentAnnounce2 from './Components/AssessmentAnnounce2';
import Announcement1 from './Components/Announcement1';
import CandidateDashboard from './Components/CandidateDashboard';
import BlankPage from './Components/BlankPage';
import Questionnaire from './Components/Questionnaire';
import Questionnaire2 from "./Components/Questionnaire2";

const App = () => {
  const year = new Date().getFullYear();
  return (
    <Router>
      <div className="h-full flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <Navbar />
      </header>
      <main className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/assessment1" element={<AssessmentAnnounce1 />} />
          <Route path="/question1" element={<AssessmentQuestion1 />} />
          <Route path="/assessment2" element={<AssessmentAnnounce2 />} />
          <Route path="/announcement1" element={<Announcement1 />} />
          <Route path="/dashboarduser" element={<CandidateDashboard />} />
          <Route path="/blank" element={<BlankPage />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/questionnaire2" element={<Questionnaire2/>} />
        </Routes>
      </main>
        <footer className='container-fluid p-4'>{year} OctoCV</footer>
        </div>
    </Router>
  );
};


export default App;

