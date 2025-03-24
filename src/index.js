import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from "./store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'jquery';                           
import '@popperjs/core';                      
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
  </Provider>
);

reportWebVitals();
