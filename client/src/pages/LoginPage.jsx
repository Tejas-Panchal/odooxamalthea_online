import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (loginData) => {
    try {
      await login(loginData);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.message); // Set error message to display
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <LoginForm onLogin={handleLogin} />
        {error && <p className="mt-4 text-red-500">{error}</p>}
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