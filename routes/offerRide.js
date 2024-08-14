const express = require('express');
const router = express.Router();

// Import individual controllers
const { createRide } = require('../controllers/offerRide/createRide');
const { getRides } = require('../controllers/offerRide/getRides');
const { getRideById } = require('../controllers/offerRide/getRideById');
const { updateRide } = require('../controllers/offerRide/updateRide');
const { deleteRide } = require('../controllers/offerRide/deleteRide');

router.post('/rides', createRide);  // Route to create a new ride offer
router.get('/rides', getRides);  // Route to get all ride offers
router.get('/rides/:id', getRideById);  // Route to get a specific ride offer by ID
router.put('/rides/:id', updateRide);  // Route to update a ride offer by ID
router.delete('/rides/:id', deleteRide);  // Route to delete a ride offer by ID

module.exports = router;