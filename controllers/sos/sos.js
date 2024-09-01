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
        const savedSOS = await newSOS.save();

        // Respond with the created SOS request
        return res.status(201).json({
            message: 'SOS request created successfully',
            sos: savedSOS
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while creating the SOS request',
            error: error.message
        });
    }
};

exports.updateSOSRequest = async (req, res) => {
    try {
        const { sosId } = req.params;
        const updates = req.body;

        // Find the SOS entry by ID
        const sos = await SOS.findById(sosId);
        if (!sos) {
            return res.status(404).json({ message: 'SOS request not found' });
        }

        // Update fields if provided in the request body
        if (updates.liveLocation) {
            sos.liveLocation = updates.liveLocation;
        }
        // Add more fields here as needed

        // Save the updated SOS record
        const updatedSOS = await sos.save();

        // Respond with the updated SOS request
        return res.status(200).json({
            message: 'SOS request updated successfully',
            sos: updatedSOS
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred while updating the SOS request',
            error: error.message
        });
    }
};
