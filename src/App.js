import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import Home from './components/HomePage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import CandidateDashboard from './components/CandidateDashboard';
import AssessmentAnnounce from './components/AssessmentAnnounce';
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
          <Route path="/assessment" element={<AssessmentAnnounce />} />
          <Route path="/blank" element={<BlankPage />} />
        </Routes>
      </main>
      <footer className='container-fluid p-4'>{year} OctoCV</footer>
    </Router>
  );
};



export default App;