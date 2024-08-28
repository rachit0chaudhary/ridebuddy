const Coupon = require('../models/Coupon');
const Ride = require('../models/Ride');


exports.redeemCoupon = async (req, res) => {
    try {
        const userId = req.user.is;
        const { couponCode, rideId } = req.body;

        const coupon = await Coupon.findOne({ code: couponCode });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        const currentDate = new Date();
        if (currentDate < coupon.validFrom || currentDate > coupon.validUntil) {
            return res.status(400).json({ message: 'Coupon is not valid' });
        }
        if (coupon.usedBy.includes(userId)) {
            return res.status(400).json({ message: 'Coupon has already been used by this user' });
        }
        if (coupon.usageLimit <= coupon.usedBy.length) {
            return res.status(400).json({ message: 'Coupon usage limit reached' });
        }
        
        coupon.usedBy.push(userId);
        await coupon.save();

        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        //discountAmount
        ride.discountAmount = coupon.discountAmount;
        ride.totalPrice = ride.totalPrice - coupon.discountAmount;
        await ride.save();

        res.status(200).json({ message: 'Coupon redeemed successfully', discountAmount: coupon.discountAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
