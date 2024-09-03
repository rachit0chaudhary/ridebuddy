const express = require('express');
const router = express.Router();


// Import individual controllers
const { createBookingRequest } = require('../controllers/bookRide/createBooking');
const { getAllRides } = require('../controllers/bookRide/getAllBookings');
const { getRideOfferById } = require('../controllers/bookRide/getBookingById');
const { updateBooking } = require('../controllers/bookRide/updateBooking');
const { cancelBooking } = require('../controllers/bookRide/cancleBooking');
const {confirmBooking}= require('../controllers/bookRide/confirmBoking');

// Define routes for Book Ride functionality
router.post('/requestBooking', createBookingRequest); // Create a new ride booking
router.patch('/getAllRides', getAllRides);
router.get('/booking/:id', getRideOfferById);  // Specific ride booking by ID
router.put('/booking/:id', updateBooking);  // Update a ride booking by ID
router.delete('/booking/:id', cancelBooking);  // Cancel a ride booking by ID

router.post('/booking/confirm', async (req, res) => {
    try {
        const bookingDetails = req.body;
        const confirmedRide = await confirmBooking(bookingDetails);
        res.status(200).json(confirmedRide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 