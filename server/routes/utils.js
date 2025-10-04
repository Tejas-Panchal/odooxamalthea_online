const express = require('express');
const router = express.Router();
const { fetchCountryData } = require('../controllers/utilController');

router.get('/countries', fetchCountryData);

module.exports = router;