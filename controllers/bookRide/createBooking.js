const BookRide = require('../../models/BookRide');

exports.createBooking = async (req, res) => {
    try {
        const { ride, user, seatsBooked, totalAmount, travelDate, pickupTime, pickupName, pickupPoint, dropoffName, dropoffPoint } = req.body;

        const newBooking = new BookRide({
            ride,
            user,
            seatsBooked,
            totalAmount,
            travelDate,
            pickupTime,
            pickupName,
            pickupPoint,
            dropoffName,
            dropoffPoint,
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: 'Ride booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create ride booking', error: error.message });
    }
};