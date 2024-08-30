const Ride = require('../../models/RideOffer');
const geolib = require('geolib');  // To calculate distance between coordinates

const getAllRides = async (req, res) => {
  console.log('getAllRides controller called', req.body);
  try {
      const { pickupDate, sourcePoint, destinationPoint, seatsBooked, femaleOnly } = req.body;

      // Fetch all rides from the database and populate all driver details
      let rides = await Ride.find({})
          .populate('driver'); // This will populate all fields from the Profile schema

      console.log('All rides with populated driver details:', rides);

      // Filter by pickup date
      if (pickupDate) {
          rides = rides.filter(ride =>
              new Date(ride.pickupDate).toISOString().split('T')[0] === new Date(pickupDate).toISOString().split('T')[0]
          );
      }

      // Filter by source point within 20 km radius
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

              const distance = geolib.getDistance(rideSourcePoint, inputSourcePoint);
              console.log(`Distance to sourcePoint: ${distance} meters`);
              return distance <= 20000; // 20 km
          });
      }

      // Filter by destination point within 20 km radius
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

              const distance = geolib.getDistance(rideDestinationPoint, inputDestinationPoint);
              console.log(`Distance to destinationPoint: ${distance} meters`);
              return distance <= 20000; // 20 km
          });
      }

      // Filter by seatsBooked (if applicable)
      if (seatsBooked) {
          rides = rides.filter(ride => {
              return parseInt(ride.noOfSeat, 10) >= parseInt(seatsBooked, 10);
          });
      }

      // Filter by femaleOnly
      if (femaleOnly !== undefined) {
          const isFemaleOnly = femaleOnly === true || femaleOnly === 'true';
          rides = rides.filter(ride => ride.onlyforFemale === isFemaleOnly);
      }

      console.log('Filtered rides:', rides);
      res.status(200).json(rides);
  } catch (error) {
      console.error('Error retrieving rides:', error);
      res.status(500).json({ message: 'Failed to retrieve rides', error: error.message });
  }
};


module.exports = { getAllRides };
