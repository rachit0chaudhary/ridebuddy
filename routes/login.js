const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login/sendOtp');
const { verifyOtp } = require('../controllers/login/verifyOtp');

router.post('/send-login-otp', login);  // Route to send OTP
router.post('/verify-login-otp', verifyOtp);  // Route to verify OTP

module.exports = router;