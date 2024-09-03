const mongoose = require('mongoose');

const confirmedRideSchema = new mongoose.Schema({
    ride: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride',
        required: true
    },
    driver: {
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        duration: {
            type: Number, // Duration in minutes
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    },
    offeredRideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ride', // Changed to 'Ride' since 'OfferedRide' might be a misnomer
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'started', 'completed', 'cancelled'],
        default: 'pending'
    },
    stops: [{
        name: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        arrivalTime: {
            type: Date // Time when the user will reach the stop
        }
    }],
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    pickupDetails: {
        name: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        time: {
            type: Date,
            required: true
        }
    },
    dropoffDetails: {
        name: {
            type: String,
            required: true
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        },
        time: {
            type: Date,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const ConfirmedRide = mongoose.model('ConfirmedRide', confirmedRideSchema);
module.exports = ConfirmedRide;