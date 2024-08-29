const express = require('express');
const router = express.Router();

const { getActiveCoupons } = require('../controllers/Coupon/getAllCoupon');

router.get('/getAllcoupons', getActiveCoupons);  // Ensure you're using GET here

module.exports = router;