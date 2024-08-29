const express = require('express');
const router = express.Router();

// Import the controller
const getActiveCoupons = require('../controllers/Coupon/getAllCoupon');

// Route to get all active coupons
router.get('/allcoupons', getActiveCoupons);  // Ensure route matches expected endpoint

module.exports = router;
