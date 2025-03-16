import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Navbar from './NavBar';
import NewProfile from './components/NewProfile';
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
          <Route path="/new-profile" element={<NewProfile />} />
          <Route path="/blank-page" element={<BlankPage />} />
        </Routes>
      </main>
      <footer className='container-fluid p-4'>{year} OctoCV</footer>
    </Router>
  );
};



export default App;