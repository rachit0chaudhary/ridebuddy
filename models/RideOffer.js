const mongoose = require('mongoose')

const RideSchemma = new mongoose.Schemma({
    source: {
        type: String,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        ref: 'User',
        required: true
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    pickupTime: {
        type: Date,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'started', 'arrived', 'cancelled', 'completed'],
        default: 'pending'
    }
})

Ride = mongoose.model('Ride', RideSchemma);
module.exports = Ride;