const Vehicle = require('../../models/Vehical');

const addVehicle = async (req, res) => {
    const { ownerId, type, vehicleNumber, rcBookDetails, dlDetails } = req.body;
    const vehiclePicture = req.file ? req.file.path : null;

    try {
        const newVehicle = new Vehicle({
            ownerId,
            type,
            vehicleNumber,
            rcBookDetails,
            dlDetails,
            vehiclePicture
        });

        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error: error.message });
    }
};

module.exports = addVehicle;