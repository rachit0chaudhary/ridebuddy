const Coupon = require('../../models/Coupon'); // Adjust path as needed

// Get all active coupons
const getActiveCoupons = async (req, res) => {
    try {
        const currentDate = new Date();
        const coupons = await Coupon.find({
            validFrom: { $lte: currentDate },
            validUntil: { $gte: currentDate }
        }).populate('createdBy', 'name'); // Optionally populate createdBy with admin's name

        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getActiveCoupons };
