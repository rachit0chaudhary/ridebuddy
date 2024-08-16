require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const Register = require('./routes/register');
const Login = require('./routes/login');
const OfferRide = require('./routes/offerRide');
const BookRide = require('./routes/bookRide');
const Wallet = require('./routes/wallet');
const Vehical = require('./routes/vehical');
const Emergency = require('./routes/vehical');
const Verification = require('./routes/verification');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', Register);
app.use('/api', Login);
app.use('/api', OfferRide);
app.use('/api', BookRide);
app.use('/api', Wallet);
app.use('/api', Vehical);
app.use('/api', Emergency);
app.use('/api', Verification);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});