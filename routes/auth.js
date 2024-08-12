const express = require('express');
const router = express.Router();
const { sendOtp } = require('../controllers/authController/sendOtp');
const { verifyOtp } = require('../controllers/authController/verifyOtp');
const { createProfile } = require('../controllers/authController/createProfile');

router.post('/send-otp', sendOtp); // Route to send OTP
router.post('/verify-otp', verifyOtp); // Route to verify OTP
router.post('/create-profile', createProfile); // Route to create profile

module.exports = router;