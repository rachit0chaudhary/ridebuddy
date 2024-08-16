const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Import individual controllers
const { createContacts } = require('../controllers/emergencyContacts/createOrUpdateEmergencyContacts');
const { getContacts } = require('../controllers/emergencyContacts/getEmergencyContacts');
const { updateContact } = require('../controllers/emergencyContacts/updateEmergencyContact');
const { deleteContact } = require('../controllers/emergencyContacts/deleteEmergencyContact');

// Define routes for Emergency Contacts functionality
router.post('/', authenticateToken, createContacts); // Route to create or update emergency contacts
router.get('/:userId', authenticateToken, getContacts); // Route to get all emergency contacts for a user
router.put('/:userId/:contactIndex', authenticateToken, updateContact); // Route to update a specific emergency contact
router.delete('/:userId/:contactIndex', authenticateToken, deleteContact); // Route to delete a specific emergency contact

module.exports = router;