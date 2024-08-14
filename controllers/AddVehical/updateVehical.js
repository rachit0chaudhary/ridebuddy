const Vehicle = require('../../models/Vehical');

const updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { type, vehicleNumber, rcBookDetails, dlDetails } = req.body;
    const vehiclePicture = req.file ? req.file.path : null;

    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (type) vehicle.type = type;
        if (vehicleNumber) vehicle.vehicleNumber = vehicleNumber;
        if (rcBookDetails) vehicle.rcBookDetails = rcBookDetails;
        if (dlDetails) vehicle.dlDetails = dlDetails;
        if (vehiclePicture) vehicle.vehiclePicture = vehiclePicture;

        await vehicle.save();
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message });
    }
};

module.exports = updateVehicle;