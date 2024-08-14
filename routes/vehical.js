const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../config/multerConfig'); // Import the multer configuration

// Import controllers from separate files
const addVehicle = require('../controllers/AddVehical/addVehicle');
const getAllVehicles = require('../controllers/AddVehical/getAllVehicales');
const getVehicleById = require('../controllers/AddVehical/getVeicleById');
const updateVehicle = require('../controllers/AddVehical/updateVehical');
const deleteVehicle = require('../controllers/AddVehical/deleteVehical');

// Define routes
router.post('/add', authenticateToken, upload.single('vehiclePicture'), addVehicle); // Route to add a new vehicle
router.get('/', authenticateToken, getAllVehicles); // Route to get all vehicles
router.get('/:id', authenticateToken, getVehicleById); // Route to get a single vehicle by ID
router.put('/update/:id', authenticateToken, upload.single('vehiclePicture'), updateVehicle); // Route to update a vehicle by ID
router.delete('/delete/:id', authenticateToken, deleteVehicle); // Route to delete a vehicle by ID

module.exports = router;