import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  An interceptor is a function that runs on every request.
  Here, we're checking localStorage for a token. If it exists,
  we add it to the 'Authorization' header of the request.
  This ensures that every request to a protected route is authenticated.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
