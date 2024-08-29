const Ride = require('../../models/RideOffer'); // Import the Ride model
const Wallet = require('../../models/Wallet'); // Import the Wallet model

exports.getRideOfferById = async (req, res) => {
    try {
        // Find the ride offer by ID and populate driver and vehical details
        const rideOffer = await Ride.findById(req.params.id)
            .populate('driver')
            .populate('vehical'); // Populate references to Profile and Vehicle models

        if (!rideOffer) {
            return res.status(404).json({ success: false, message: 'Ride offer not found' });
        }

        // Find the wallet details for the driver
        const wallet = await Wallet.findOne({ userId: rideOffer.driver._id });

        // If wallet not found, return a response with a message
        if (!wallet) {
            return res.status(404).json({ success: false, message: 'Wallet not found for the driver' });
        }

        // Send the ride offer details and wallet details in the response
        res.status(200).json({
            success: true,
            rideOffer,
            wallet
        });
    } catch (error) {
        // Handle errors and send an appropriate response
        res.status(500).json({ success: false, message: 'Failed to fetch ride offer', error: error.message });
    }
};

