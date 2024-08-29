const Ride = require('../../models/RideOffer'); // Import the Ride model

exports.getRideOfferById = async (req, res) => {
    try {
        // Find the ride offer by ID
        const rideOffer = await Ride.findById(req.params.id)
            .populate('driver vehical'); // Populate references to Profile and Vehicle models

        if (!rideOffer) {
            return res.status(404).json({ success: false, message: 'Ride offer not found' });
        }

        // Send the ride offer details in the response
        res.status(200).json({ success: true, rideOffer });
    } catch (error) {
        // Handle errors and send an appropriate response
        res.status(500).json({ success: false, message: 'Failed to fetch ride offer', error: error.message });
    }
};
