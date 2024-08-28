const Offer = require('../../models/Coupon');

exports.deleteOffer = async (req, res) => {
    try {
        const offerId = req.params.id;

        // Find and delete the offer
        const offer = await Offer.findByIdAndDelete(offerId);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
