import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContext";
import "jquery";
import "@popperjs/core";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
