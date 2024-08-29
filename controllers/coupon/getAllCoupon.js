const Coupon = require('../../models/Coupon'); // Adjust the path to your Coupon model

// Controller to get all non-expired coupons
exports.getActiveCoupons = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Find all coupons where validUntil is greater than the current date
        const activeCoupons = await Coupon.find({ validUntil: { $gt: currentDate } });

        // Send the active coupons as the response
        res.status(200).json({ success: true, coupons: activeCoupons });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ success: false, message: 'Failed to retrieve active coupons', error: error.message });
    }
};
