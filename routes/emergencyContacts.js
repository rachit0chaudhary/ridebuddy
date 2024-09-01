const express = require('express');
const router = express.Router();


// Import individual controllers
const { createContacts } = require('../controllers/emergency/createContact');
const { getContacts } = require('../controllers/emergency/getContact');
const { updateContact } = require('../controllers/emergency/updateContact');
const { deleteContact } = require('../controllers/emergency/deleteContact');

// Define routes for Emergency Contacts functionality
router.post('/emergencyContacts',  createContacts); // Route to create or update emergency contacts
router.get('/emergencyContacts/:userId',  getContacts); // Route to get all emergency contacts for a user
router.put('/emergencyContacts/:userId/:contactIndex',  updateContact); // Route to update a specific emergency contact
router.delete('/emergencyContacts/:userId/:contactIndex', deleteContact); // Route to delete a specific emergency contact

module.exports = router;