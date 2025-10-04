import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const handleLogin = (loginData) => {
    console.log('Logging in with:', loginData);
    // API call to log in will go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <LoginForm onLogin={handleLogin} />
        <p className="mt-4">
          First time user?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create a Company Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;