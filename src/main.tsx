import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";

import Header from "./components/simple/Header/Header";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
