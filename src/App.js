import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import Home from './components/HomePage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import AssessmentAnnounce1 from './components/AssessmentAnnounce1';
import AssessmentQuestion1 from './components/AssessmentQuestion1';
import AssessmentAnnounce2 from './components/AssessmentAnnounce2';
import Announcement1 from './components/Announcement1';
import CandidateDashboard from './components/CandidateDashboard';
import BlankPage from './components/BlankPage';

const App = () => {
  const year = new Date().getFullYear();
  return (
    <Router>
      <header className='container-fluid p-4'>
        <Navbar />
      </header>
      <main className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
          <Route path="/assessment1" element={<AssessmentAnnounce1 />} />
          <Route path="/question1" element={<AssessmentQuestion1 />} />
          <Route path="/assessment2" element={<AssessmentAnnounce2 />} />
          <Route path="/announcement1" element={<Announcement1 />} />
          <Route path="/dashboard1" element={<CandidateDashboard />} />
          <Route path="/blank" element={<BlankPage />} />
        </Routes>
      </main>
      <footer className='container-fluid p-4'>{year} OctoCV</footer>
    </Router>
  );
};



export default App;