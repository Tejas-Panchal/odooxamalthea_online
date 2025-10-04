const axios = require('axios');

const convertCurrency = async (from, to, amount) => {
  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;

  try {
    const response = await axios.get(URL);
    if (response.data && response.data.result === 'success') {
      return response.data.conversion_result;
    } else {
      throw new Error('Currency conversion failed');
    }
  } catch (error) {
    console.error('Error during currency conversion:', error.response ? error.response.data : error.message);
    // Fallback: If conversion fails, return the original amount.
    // In a real app, you might want to block the submission or handle this differently.
    return amount;
  }
};

module.exports = { convertCurrency };