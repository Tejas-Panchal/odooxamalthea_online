const { getCountryData } = require('../utils/countryUtils');

// @desc    Get country and currency data
// @route   GET /api/utils/countries
exports.fetchCountryData = async (req, res) => {
  try {
    const data = await getCountryData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};