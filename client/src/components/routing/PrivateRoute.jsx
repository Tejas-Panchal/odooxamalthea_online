import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const isAuthenticated = true;
  return isAuthenticated;
};

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);
  const isAuth = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;