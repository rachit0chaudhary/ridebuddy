const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig.js');
const authenticateToken = require('../middleware/authenticateToken');
const { createCoupon } = require('../controllers/Coupon/createCoupon.js')
const { applyCoupon } = require('../controllers/Coupon/applyCoupon.js')
const { deleteOffer } = require("../controllers/Coupon/deleteOffer.js")



router.post('/create-coupon', createCoupon); // Route to create coupon by admin and add middleware
router.post('/apply-code', authenticateToken, applyCoupon); // Route for apply coupon code

module.exports = router;