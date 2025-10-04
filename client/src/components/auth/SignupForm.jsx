import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const SignupForm = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    currency: 'USD', // Default currency
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Company Account</h2>
      <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
      <Input label="Your Name" name="name" value={formData.name} onChange={handleChange} />
      <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
      <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
      {/* In a real app, this would be a dropdown populated from the API */}
      <Input label="Default Currency" name="currency" value={formData.currency} onChange={handleChange} />
      <Button type="submit" variant="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;