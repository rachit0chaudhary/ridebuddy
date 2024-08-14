const Ride = require('../../models/RideOffer');

exports.createRide = async (req, res) => {
    try {
        const { source, addStop, destination, vehical, routes, tripDistance, tripDuration, pickupTime, pickupDate, noOfSeat, pricePerSeat } = req.body;
        
        const newRide = new Ride({
            source,
            addStop,
            destination,
            vehical,
            routes,
            tripDistance,
            tripDuration,
            pickupTime,
            pickupDate,
            noOfSeat,
            pricePerSeat
        });

        await newRide.save();
        res.status(201).json({ success: true, message: 'Ride created successfully', ride: newRide });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create ride', error: error.message });
    }
};