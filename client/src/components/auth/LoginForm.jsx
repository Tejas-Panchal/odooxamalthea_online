import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }); // Pass data up to the parent page
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <Button type="submit" variant="primary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;