import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// The import below has been corrected
import SignupForm from '../components/auth/SignupForm';
import { AuthContext } from '../context/AuthContext';
import { getCountriesAndCurrencies } from '../services/utilsService';

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      const data = await getCountriesAndCurrencies();
      setCountries(data);
    };

    fetchCountryData();
  }, []);

  const handleSignup = async (signupData) => {
    setError('');
    setIsLoading(true);
    
    try {
      await signup(signupData);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <SignupForm onSignup={handleSignup} isLoading={isLoading} countries={countries} />

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;