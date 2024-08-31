const mongoose = require('mongoose');
const { Schema } = mongoose;

const sosSchema = new Schema({
    rideId: {
        type: Schema.Types.ObjectId,
        ref: 'Ride',
        required: true,
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile', // Assuming driver profiles are also stored in the Profile schema
        required: true,
    },
    vehicleId: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    passengerProfiles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
    ],
    liveLocation: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    sosTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = mongoose.model('SOS', sosSchema);
