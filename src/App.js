import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Login from './components/Login';
import Navbar from './NavBar';
import NewProfile from './components/NewProfile';
import BlankPage from './components/BlankPage';

const App = () => {
  const year = new Date().getFullYear();
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-profile" element={<NewProfile />} />
          <Route path="/blank-page" element={<BlankPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer>{year} OctoCV</footer>
    </Router>
  );
};

export default App;