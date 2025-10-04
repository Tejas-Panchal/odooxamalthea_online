import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSignup = async (signupData) => {
        try {
            await signup(signupData);
            navigate('/dashboard');
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <SignupForm onSignup={handleSignup} />
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;