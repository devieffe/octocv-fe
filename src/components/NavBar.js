import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Octo<span>CV</span></Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"  // Keeps it collapsed by default
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link active" to="/" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Log in</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Sign up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/questionnaire" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Questionnaire</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/make" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Make CV</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/authenticate" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>@authenticate</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>@user</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>@admin</Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="/blank" onClick={() => document.getElementById('navbarNav').classList.remove('show')}>Blank page</Link>
      </li> */}
    </ul>
  </div>
  </div>
</nav>
);

export default Navbar;