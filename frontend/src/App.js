import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IconDetail from "./pages/IconDetail";
import ErrorBoundary from "./components/ErrorBoundary";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing"; 
import SubIconDashboard from "./pages/SubIconDashboard";
import SubIconDetails from "./pages/SubIconDetails";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => (
  <Router>
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<ErrorBoundary><Landing /></ErrorBoundary>} />

      <Route path="/category" element={<ErrorBoundary><Category /></ErrorBoundary>} />

      <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />

      <Route path="/dashboard/:category" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />

      <Route path="/icon/:id" element={<ErrorBoundary><IconDetail /></ErrorBoundary>} />

      <Route path="/subicons/:iconId" element={<SubIconDashboard />} />
      <Route path="/subicondetails/:iconId/:subIconId"element={<SubIconDetails />}/>


    </Routes>
  </Router>
);

export default App;
