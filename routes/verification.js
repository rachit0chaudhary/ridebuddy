const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Import individual controllers
const { performVerification } = require('../controllers/verification/performVerification');
const { getVerificationDetails } = require('../controllers/verification/getVerification');

// Define routes for verification functionality
router.post('/verify', authenticateToken, performVerification); // Route to perform verification
router.get('/verification/:verificationId', authenticateToken, getVerificationDetails); // Route to get verification details by ID

module.exports = router;