const SOS = require('../../models/sos'); // Assuming the SOS model is in the models directory
const Ride = require('../../models/BookRide'); // Assuming the Ride model is in the models directory
const Profile = require('../../models/Profile'); // Assuming the Profile model is in the models directory
const Vehicle = require('../../models/Vehicle'); // Assuming the Vehicle model is in the models directory

// Create a new SOS request
exports.createSOSRequest = async (req, res) => {
    try {
        const { rideId, profileId, liveLocation } = req.body;

        // Find the ride details using rideId
        const ride = await Ride.findById(rideId).populate('driverId').populate('vehicleId').populate('passengerProfiles');
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Check if the profileId exists in the ride's passengers or as the driver
        const passengerProfiles = ride.passengerProfiles;
        const driverId = ride.driverId;
        const vehicleId = ride.vehicleId;

        // Create the SOS record
        const newSOS = new SOS({
            rideId,
            profileId,
            driverId,
            vehicleId,
            passengerProfiles,
            liveLocation,
        });

        // Save the SOS record to the database
        await newSOS.save();

        // Respond with the created SOS request
        return res.status(201).json({ message: 'SOS request created successfully', sos: newSOS });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating the SOS request', error: error.message });
    }
};
