const Vehicle = require('../../models/Vehical');

const addVehicle = async (req, res) => {
    const { ownerId, vehicleName, type, vehicleNumber, vehicleColor, rcBookDetails, dlDetails, rcResponses, dlResponses } = req.body;
    const vehiclePicture = req.file ? req.file.path : null;

    try {
        const newVehicle = new Vehicle({
            ownerId,
            vehicleName,
            type,
            vehicleNumber,
            vehicleColor,
            rcBookDetails,
            rcResponses: JSON.parse(rcResponses),
            dlDetails,
            dlResponses: JSON.parse(dlResponses),
            vehiclePicture
        });

        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error: error.message });
    }
};

module.exports = addVehicle;
