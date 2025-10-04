const axios = require('axios');

// Fetches a list of countries and their currencies
const getCountryData = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,currencies');
    
    // Format the data to be more frontend-friendly
    const formattedData = response.data.map(country => {
      const currencyCode = Object.keys(country.currencies)[0];
      if (currencyCode) {
        return {
          country: country.name.common,
          currencyCode: currencyCode,
          currencyName: country.currencies[currencyCode].name,
        };
      }
      return null;
    }).filter(Boolean); // Filter out any null entries

    return formattedData.sort((a, b) => a.country.localeCompare(b.country));

  } catch (error) {
    console.error('Error fetching country data:', error);
    throw new Error('Could not fetch country data');
  }
};

module.exports = { getCountryData };