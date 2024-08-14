const BookRide = require('../../models/BookRide');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await BookRide.find().populate('ride user');
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch ride bookings', error: error.message });
    }
};