const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../config/multerConfig'); // Import the multer configuration

// Import controllers from separate files
const addVehicle = require('../controllers/addVehical/addVehicle');
const getAllVehicles = require('../controllers/addVehical/getAllVehicales');
const getVehicleById = require('../controllers/addVehical/getVeicleById');
const deleteVehicle = require('../controllers/addVehical/deleteVehical');

// Define routes for vehicle management
router.post('/add', authenticateToken, upload.single('vehiclePicture'), addVehicle); // Route to add a new vehicle
router.get('/', authenticateToken, getAllVehicles); // Route to get all vehicles
router.get('/:id', authenticateToken, getVehicleById); // Route to get a single vehicle by ID
router.delete('/delete/:id', authenticateToken, deleteVehicle); // Route to delete a vehicle by ID

module.exports = router;