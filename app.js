require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const loginRoutes = require('./routes/login');
const offerRideRoutes = require('./routes/offerRide');
const bookRideRoutes = require('./routes/bookRide');
const walletRoutes = require('./routes/wallet');
const VehicalRoutes = require('./routes/vehical');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes);
app.use('/api', loginRoutes);
app.use('/api', offerRideRoutes);
app.use('/api', bookRideRoutes);
app.use('/api', walletRoutes);
app.use('/api', VehicalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});