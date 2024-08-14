const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Import individual controllers
const { createRide } = require('../controllers/offerRide/createRide');
const { getRides } = require('../controllers/offerRide/getRides');
const { getRideById } = require('../controllers/offerRide/getRideById');
const { updateRide } = require('../controllers/offerRide/updateRide');
const { deleteRide } = require('../controllers/offerRide/deleteRide');

router.post('/rides', authenticateToken, createRide);  // Route to create a new ride offer
router.get('/rides', authenticateToken, getRides);  // Route to get all ride offers
router.get('/rides/:id', authenticateToken, getRideById);  // Route to get a specific ride offer by ID
router.put('/rides/:id', authenticateToken, updateRide);  // Route to update a ride offer by ID
router.delete('/rides/:id', authenticateToken, deleteRide);  // Route to delete a ride offer by ID

module.exports = router;