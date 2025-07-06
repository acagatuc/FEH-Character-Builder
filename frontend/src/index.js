import React from "react";
import ReactDOM from "react-dom/client";  // <-- changed here
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./fonts/stylesheet.css";
import { store } from "./rtk/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);  // <-- create root here

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
