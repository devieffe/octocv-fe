import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'jquery';                               // Import jQuery
import '@popperjs/core';                       // Import Popper.js
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap's JS bundle
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
