const RequestBooking = require('../../models/RequestBooking');

// Controller function to handle the creation of a booking request
const createBookingRequest = async (req, res) => {
    try {
        const {
            pickupName,
            dropoffName,
            pickupPoint,
            dropoffPoint,
            userProfile,
            offerRide,
            paymentAmount,
            noOfSeatsBooked
        } = req.body;

        // Create a new RequestBooking instance
        const newBookingRequest = new RequestBooking({
            pickupName,
            dropoffName,
            pickupPoint,
            dropoffPoint,
            userProfile,
            offerRide,
            paymentAmount,
            noOfSeatsBooked
        });

        // Save the booking request to the database
        await newBookingRequest.save();

        res.status(201).json({ message: 'Booking request created successfully', booking: newBookingRequest });
    } catch (error) {
        console.error('Error creating booking request:', error);
        res.status(500).json({ message: 'Failed to create booking request', error: error.message });
    }
};

module.exports = {
    createBookingRequest
};
