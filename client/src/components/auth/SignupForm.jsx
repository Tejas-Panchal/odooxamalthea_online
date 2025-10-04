import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

// This component is "dumb". It only manages its own form state.
// It receives 'onSignup' (the function to call on submit), 'isLoading', and 'countries' from its parent.
const SignupForm = ({ onSignup, isLoading, countries }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    country: '',
    currency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const countryData = countries.find(c => c.country === selectedCountryName);

    setFormData(prevData => ({
      ...prevData,
      country: selectedCountryName,
      currency: countryData ? countryData.currencyCode : '',
    }));
  };

  // The form's handleSubmit simply calls the onSignup prop.
  // It does NOT contain any try/catch or API logic.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.currency) {
      alert("Please select a country to set the currency.");
      return;
    }
    onSignup(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Company Account</h2>

      <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
      <Input label="Your Full Name" name="name" value={formData.name} onChange={handleChange} required />
      <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
      <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />

      <div className="mt-4">
        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleCountryChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>-- Select your company's country --</option>
          {countries.map(c => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </select>
      </div>

      {formData.currency && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-center text-sm">
          Default currency will be set to: <span className="font-semibold">{formData.currency}</span>
        </div>
      )}

      <div className="mt-6">
        <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating Account...' : 'Sign Up & Create Company'}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;