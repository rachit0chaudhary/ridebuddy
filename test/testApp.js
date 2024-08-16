require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const offerRideRoutes = require('./routes/offerRide');
const bookRideRoutes = require('./routes/bookRide');
const walletRoutes = require('./routes/wallet');
const vehicalRoutes = require('./routes/vehical');
const messageController = require('./controllers/messageController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

connectDB();

// REST API Routes
app.use('/api', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', offerRideRoutes);
app.use('/api', bookRideRoutes);
app.use('/api', walletRoutes);
app.use('/api', vehicalRoutes);

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinRoom', ({ rideId, userId }) => {
        socket.join(rideId);
        console.log(`${userId} joined room: ${rideId}`);
    });

    socket.on('sendMessage', async ({ rideId, senderId, message }) => {
        try {
            const newMessage = await messageController.saveMessage(rideId, senderId, message);
            io.to(rideId).emit('receiveMessage', newMessage);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});