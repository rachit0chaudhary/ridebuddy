const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig.js');
const authenticateToken = require('../middleware/authenticateToken');

// Importing individual controller functions from their respective files
const { sendOtp } = require('../controllers/authController/sendOtp');
const { verifyOtp } = require('../controllers/authController/verifyOtp');
const { createProfile } = require('../controllers/authController/createProfile');
const { updateProfile } = require('../controllers/authController/updateProfile');

router.post('/send-otp', sendOtp); // Route to send OTP
router.post('/verify-otp', verifyOtp); // Route to verify OTP
router.post('/create-profile', createProfile); // Route to create profile

router.post('/update/:userId', authenticateToken, upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'images', maxCount: 5 }
]), updateProfile); // Route to update profile

module.exports = router;