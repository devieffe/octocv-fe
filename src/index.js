import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from "./store";
import { Provider } from "react-redux";
import 'jquery';                           
import '@popperjs/core';                      
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
  </Provider>
);

reportWebVitals();
