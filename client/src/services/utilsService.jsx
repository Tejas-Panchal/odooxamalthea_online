import axios from 'axios';

// We use a simple in-memory cache to avoid calling the API on every page load
let cachedCountries = null;

export const getCountriesAndCurrencies = async () => {
  // If we already have the data, return it immediately
  if (cachedCountries) {
    return cachedCountries;
  }

  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,currencies');

    // The API response is complex, so we format it into a clean array
    const formattedData = response.data
      .map(country => {
        // The currencies object can be empty or have multiple entries
        const currencyCodes = Object.keys(country.currencies || {});
        if (currencyCodes.length === 0) {
          return null; // Skip countries with no currency information
        }
        
        // We'll take the first currency code as the primary one
        const currencyCode = currencyCodes[0];
        const currencyName = country.currencies[currencyCode].name;

        return {
          country: country.name.common,
          currencyCode: currencyCode,
          currencyName: currencyName,
        };
      })
      .filter(Boolean); // Filter out any null entries

    // Sort the list alphabetically by country name for a better user experience
    formattedData.sort((a, b) => a.country.localeCompare(b.country));
    
    // Store the formatted data in our cache
    cachedCountries = formattedData;
    return formattedData;

  } catch (error) {
    console.error("Failed to fetch country and currency data:", error);
    // Return an empty array on failure to prevent the app from crashing
    return [];
  }
};