import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/routing/PrivateRoute'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />

    <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
            <Route path="/dashboard" element={<DashboardPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;