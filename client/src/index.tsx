import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

declare global {
  var API_ENDPOINT: string;
}

const isProduction = false;
global.API_ENDPOINT = isProduction
  ? "https://paradoxtest.onrender.com"
  : "http://localhost:5000";

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
