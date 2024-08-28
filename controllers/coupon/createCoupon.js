const Coupon = require('../../models/Coupon');

exports.createCoupon = async (req, res) => {
    try {
        const { code, discountAmount, usageLimit } = req.body;
        const createdBy = req.user._id;

        // Parse validFrom to Date
        const validFromDate = new Date();

        // Set validUntil to 7 days after validFrom
        const validUntilDate = new Date(validFromDate);
        validUntilDate.setDate(validFromDate.getDate() + 7);

        const coupon = new Coupon({
            code,
            discountAmount,
            validFrom: validFromDate,
            validUntil: validUntilDate,
            usageLimit,
            createdBy
        });

        const savedCoupon = await coupon.save();
        res.status(201).json(savedCoupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};