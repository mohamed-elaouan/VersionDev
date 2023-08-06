import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './i18n';
import App from "./App";
import  {ThemeProvider}  from "./Context/DataContext.jsx";
import { HelmetProvider } from "react-helmet-async";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
);
