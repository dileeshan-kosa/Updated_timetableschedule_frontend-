import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </Router>
  </Provider>
  // </React.StrictMode>
);
