import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Questo carica App.tsx
import "./index.css"; // Se hai un file CSS principale, altrimenti usa './App.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
