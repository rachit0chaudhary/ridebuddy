const Coupon = require('../../models/Coupon');

exports.applyCoupon = async (req, res) => {
    try {
        const userId = req.user.id;
        const { couponCode } = req.body;

        // Find the coupon
        const coupon = await Coupon.findOne({ code: couponCode });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        // Check validity
        const currentDate = new Date();
        if (currentDate < coupon.validFrom || currentDate > coupon.validUntil) {
            return res.status(400).json({ message: 'Coupon is not valid' });
        }

        // Check if the coupon already used or not by the user
        const hasUsedCoupon = coupon.usedBy.some(entry => entry.userId.toString() === userId.toString());
        if (hasUsedCoupon) {
            return res.status(400).json({ message: 'Coupon has already been used by this user' });
        }

        // Check usage limit
        if (coupon.usageLimit <= coupon.usedBy.length) {
            return res.status(400).json({ message: 'Coupon usage limit reached' });
        }
        coupon.usedBy.push({ userId });

        //here we are add reward in user wallet


        await coupon.save();

        res.status(200).json({ message: 'Coupon applied successfully', discountAmount: coupon.discountAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
