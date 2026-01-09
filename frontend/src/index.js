/*import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);*/
/*import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
  </React.StrictMode>
);
*/
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AppProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* AppProvider and LanguageProvider wrap the app */}
    <AppProvider>
      <LanguageProvider>
        {/* Only one BrowserRouter in the entire app */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </AppProvider>
  </React.StrictMode>
);
