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
import Login from "./pages/Login";   // <-- تأكدي أن عندك Login.js
import Signup from "./pages/Signup"; // <-- Signup.js لو هتستخدميه
import '@fortawesome/fontawesome-free/css/all.min.css';
import Settings from "./pages/settings";

const App = () => (
    <Routes>
       {/* Login Page - يفتح أولاً */}
      <Route path="/" element={<Login />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      {/* Landing Page - بعد Login */}
      <Route path="/landing" element={<ErrorBoundary><Landing /></ErrorBoundary>} />


       {/*Landing Page*/ }
      {/*<Route path="/" element={<ErrorBoundary><Landing /></ErrorBoundary>} />*/}

      <Route path="/category" element={<ErrorBoundary><Category /></ErrorBoundary>} />

      <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />

      <Route path="/dashboard/:category" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />

      <Route path="/icon/:id" element={<ErrorBoundary><IconDetail /></ErrorBoundary>} />

      <Route path="/subicons/:iconId" element={<SubIconDashboard />} />
      <Route path="/subicondetails/:iconId/:subIconId"element={<SubIconDetails />}/>


    </Routes>
);

export default App;
