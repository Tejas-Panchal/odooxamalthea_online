import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios'; 

// 1. Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true, 
};

// 2. Create Context
export const AuthContext = createContext(initialState);
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

// 4. Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await getLoggedInUser(); // API call to /api/auth/me
          dispatch({ type: 'AUTH_SUCCESS', payload: res.data });
        } catch (err) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };
    loadUser();
  }, []);

  // --- ACTIONS ---

  // Signup Action
  const signup = async (userData) => {
    try {
      const res = await signupUser(userData);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
    } catch (err) {
      console.error(err.response.data);
      // You can dispatch an error action here to show an error message in the UI
    }
  };

  // Login Action
  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      console.error(err.response.data);
      throw new Error(err.response.data.msg || 'Login failed');
    }
  };

  // Logout Action
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signup,
        login,
        logout,
      }}
    >
      {!state.loading && children}
    </AuthContext.Provider>
  );
};