const RideOffer = require('../../models/RideOffer');
const geolib = require('geolib');  // To calculate distance between coordinates

const getAllRides = async (req, res) => {
    console.log('getAllRides controller called', req.body);
    try {
        const { pickupDate, sourcePoint, destinationPoint, seatsBooked, femaleOnly } = req.body;

        // Fetch all rides from the database and populate all driver details
        let rides = await RideOffer.find({})
            .populate('driver'); // This will populate all fields from the Profile schema

        // Helper function to calculate distance
        const isWithinRadius = (point1, point2, radius = 20000) => {
            const distance = geolib.getDistance(point1, point2);
            return distance <= radius;
        };

        // Filter by pickup date
        if (pickupDate) {
            const pickupDateFormatted = new Date(pickupDate).toISOString().split('T')[0];
            rides = rides.filter(ride => {
                const rideDate = new Date(ride.date);
                const rideDateFormatted = isNaN(rideDate.getTime()) ? null : rideDate.toISOString().split('T')[0];
                return rideDateFormatted === pickupDateFormatted;
            });
        }

        // Filter by source and stop points and add 'start' field
        if (sourcePoint) {
            rides = rides.filter(ride => {
                const rideSourcePoint = {
                    latitude: parseFloat(ride.sourcePoint.latitude),
                    longitude: parseFloat(ride.sourcePoint.longitude)
                };
                const inputSourcePoint = {
                    latitude: parseFloat(sourcePoint.latitude),
                    longitude: parseFloat(sourcePoint.longitude)
                };

                const rideStopPoint = ride.addStopPoint ? {
                    latitude: parseFloat(ride.addStopPoint.latitude),
                    longitude: parseFloat(ride.addStopPoint.longitude)
                } : null;

                let start = null;
                if (isWithinRadius(rideSourcePoint, inputSourcePoint)) {
                    start = {
                        name: ride.sourceName,
                        coordinates: rideSourcePoint
                    };
                } else if (rideStopPoint && isWithinRadius(rideStopPoint, inputSourcePoint)) {
                    start = {
                        name: ride.addStopName,
                        coordinates: rideStopPoint
                    };
                }

                // Add the 'start' field if a match is found
                if (start) {
                    ride.start = start;
                    return true;
                }
                return false;
            });
        }

        // Filter by destination and stop points and add 'end' field
        if (destinationPoint) {
            rides = rides.filter(ride => {
                const rideDestinationPoint = {
                    latitude: parseFloat(ride.destinationPoint.latitude),
                    longitude: parseFloat(ride.destinationPoint.longitude)
                };
                const inputDestinationPoint = {
                    latitude: parseFloat(destinationPoint.latitude),
                    longitude: parseFloat(destinationPoint.longitude)
                };

                const rideStopPoint = ride.addStopPoint ? {
                    latitude: parseFloat(ride.addStopPoint.latitude),
                    longitude: parseFloat(ride.addStopPoint.longitude)
                } : null;

                let end = null;
                if (isWithinRadius(rideDestinationPoint, inputDestinationPoint)) {
                    end = {
                        name: ride.destinationName,
                        coordinates: rideDestinationPoint
                    };
                } else if (rideStopPoint && isWithinRadius(rideStopPoint, inputDestinationPoint)) {
                    end = {
                        name: ride.addStopName,
                        coordinates: rideStopPoint
                    };
                }

                // Add the 'end' field if a match is found
                if (end) {
                    ride.end = end;
                    return true;
                }
                return false;
            });
        }

        // Filter by seatsBooked (if applicable)
        if (seatsBooked) {
            rides = rides.filter(ride => parseInt(ride.seatsOffered, 10) >= parseInt(seatsBooked, 10));
        }

        // Filter by femaleOnly preference
        if (femaleOnly !== undefined) {
            const isFemaleOnly = femaleOnly === true || femaleOnly === 'true';
            rides = rides.filter(ride => ride.gender === isFemaleOnly);
        }

        // Map the response to include 'start' and 'end' fields
        const response = rides.map(ride => ({
            ...ride._doc, // Use _doc to get the raw MongoDB document
            start: ride.start || null,
            end: ride.end || null
        }));

        console.log('Filtered rides:', response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error retrieving rides:', error);
        res.status(500).json({ message: 'Failed to retrieve rides', error: error.message });
    }
};

module.exports = { getAllRides };



module.exports = { getAllRides };
