const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Vehicle Schema
const VehicleSchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Diesel', 'Petrol', 'CNG', 'Electric'],
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    rcBookDetails: {
        type: String,
        required: true
    },
    dlDetails: {
        type: String,
        required: true
    },
    vehiclePicture: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);