import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateUserPage from './components/admin/CreateUserPage'; // Import new page
import CreateWorkflowPage from './components/admin/CreateWorkflowPage';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/routing/PrivateRoute'; // Import the new component
<<<<<<< HEAD
import MyExpense from './components/manager/MyExpense';

=======
import TeamReportPage from './pages/TeamReportPage';
>>>>>>> f10a410f1aef957378d4c7514965b62e3d83ca89
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
<<<<<<< HEAD

            <Route path="/admin/users/create" element={<CreateUserPage />} />
          <Route path="/admin/workflows/create" element={<CreateWorkflowPage />} />
          <Route path="/manager/my-expenses" element={<MyExpense />} />
          
=======
           <Route path="/team-report" element={<TeamReportPage />} />
>>>>>>> f10a410f1aef957378d4c7514965b62e3d83ca89
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;