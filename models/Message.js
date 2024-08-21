const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Message', messageSchema);