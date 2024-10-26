// reportRoutes.js
const express = require('express');
const { generatePDFReport } = require('../controllers/reportController');

const router = express.Router();

// Define the route to generate a PDF report for a specific user
router.get('/report/:userId', generatePDFReport);

module.exports = router;
