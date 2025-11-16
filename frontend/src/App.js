import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IconDetail from "./pages/IconDetail";
import ErrorBoundary from "./components/ErrorBoundary";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
      <Route path="/icon/:id" element={<ErrorBoundary><IconDetail /></ErrorBoundary>} />
    </Routes>
  </Router>
);

export default App;
