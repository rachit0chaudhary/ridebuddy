const express = require('express');
const router = express.Router();


// Import individual controllers
const { createBooking } = require('../controllers/bookRide/createBooking');
const { getAllRides } = require('../controllers/bookRide/getAllBookings');
const { getRideOfferById } = require('../controllers/bookRide/getBookingById');
const { updateBooking } = require('../controllers/bookRide/updateBooking');
const { cancelBooking } = require('../controllers/bookRide/cancleBooking');

// Define routes for Book Ride functionality
router.post('/book-ride', createBooking); // Create a new ride booking
router.patch('/getAllRides', getAllRides);
router.get('/booking/:id', getRideOfferById);  // Specific ride booking by ID
router.put('/booking/:id', updateBooking);  // Update a ride booking by ID
router.delete('/booking/:id', cancelBooking);  // Cancel a ride booking by ID

module.exports = router; 