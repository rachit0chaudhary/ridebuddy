const BookRide = require('../../models/BookRide');

exports.getBookingById = async (req, res) => {
    try {
        const booking = await BookRide.findById(req.params.id).populate('ride user');
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Ride booking not found' });
        }
        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch ride booking', error: error.message });
    }
};