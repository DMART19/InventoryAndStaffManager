import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/Authentication Pages/SignInPage";
import SignUpPage from "./pages/Authentication Pages/SignUpPage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import ForgotPasswordPage from "./pages/Authentication Pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import StaffManagement from "./pages/Staff/StaffManagement";
import Inventory from "./pages/Inventory/Inventory";
import Tasks from "./pages/Task/Task";
import Calendar from "./pages/Calendar/Calendar";
import Settings from "./pages/Settings/Settings";

// Keep the QuickActionsMenu import
import QuickActionsMenu from "./components/QuickActionsMenu";

import "./App.css";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Track sign-in state
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false); // Track onboarding state

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<SignInPage setIsSignedIn={setIsSignedIn} />} />
        <Route
          path="/authentication/signin"
          element={<SignInPage setIsSignedIn={setIsSignedIn} />}
        />
        <Route path="/authentication/signup" element={<SignUpPage />} />
        <Route path="/authentication/forgot-password" element={<ForgotPasswordPage />} />

        {/* Onboarding Route */}
        <Route
          path="/onboarding"
          element={
            isSignedIn && !hasCompletedOnboarding ? (
              <OnboardingPage setHasCompletedOnboarding={setHasCompletedOnboarding} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Main App Routes */}
        <Route
          path="/dashboard"
          element={isSignedIn ? <Dashboard /> : <Navigate to="/authentication/signin" />}
        />
        <Route
          path="/staff-management"
          element={isSignedIn ? <StaffManagement /> : <Navigate to="/authentication/signin" />}
        />
        <Route
          path="/inventory"
          element={isSignedIn ? <Inventory /> : <Navigate to="/authentication/signin" />}
        />
        <Route
          path="/tasks"
          element={isSignedIn ? <Tasks /> : <Navigate to="/authentication/signin" />}
        />
        <Route
          path="/calendar"
          element={isSignedIn ? <Calendar /> : <Navigate to="/authentication/signin" />}
        />
        <Route
          path="/settings"
          element={isSignedIn ? <Settings /> : <Navigate to="/authentication/signin" />}
        />

        {/* Keep the QuickActionsMenu route */}
        <Route
          path="/quick-actions-menu"
          element={isSignedIn ? <QuickActionsMenu /> : <Navigate to="/authentication/signin" />}
        />
      </Routes>
    </Router>
  );
};

export default App;