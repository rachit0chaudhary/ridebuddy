const mongoose = require('mongoose');

function wordLimit(val) {
    return val.split(' ').filter(word => word.length > 0).length <= 300;
}

function arrayLimit(val) {
    return val.length <= 5;
}

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePicture: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        validate: [wordLimit, '{PATH} exceeds the 300-word limit']
    },
    interests: [String],
    faceID: {
        type: String,
    },
    images: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
});

module.exports = mongoose.model('Profile', ProfileSchema);