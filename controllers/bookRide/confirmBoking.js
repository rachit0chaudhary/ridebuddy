const ConfirmedRide = require('../../models/ConfirmedRide');
const Wallet = require('../../models/Wallet');
const RideOffer = require('../../models/RideOffer');
const BookRide = require('../../models/BookRide');
const CurrentHolding = require('../../models/currentHolding');
const mongoose = require('mongoose');

function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

async function confirmBooking(bookingDetails) {
    const { userProfile, offerRide, paymentAmount, noOfSeatsBooked, pickupDetails, dropoffDetails } = bookingDetails;
console.log(bookingDetails)

    // Find the user's wallet
    // const userWallet = await Wallet.findOne({ userId: userProfile });
    const currentHolding = await CurrentHolding.find();

    // if (!userWallet || userWallet.balance < paymentAmount) {
    //     throw new Error('Insufficient balance.');
    // }

    // Deduct the amount from the user's wallet
    // userWallet.balance -= paymentAmount;
    currentHolding.Amount += paymentAmount;
    // await userWallet.save();
    // await currentHolding.save();

    // Find the ride offer
   
const _id = mongoose.Types.ObjectId(offerRide);


    console.log('Finding RideOffer with ID:', _id);
    const rideOffer = await RideOffer.findById(_id);
    console.log('Found RideOffer:', rideOffer);
    

    if (!rideOffer) {
        throw new Error('Ride offer not found.');
    }

    if (rideOffer.seatsOffered < noOfSeatsBooked) {
        throw new Error('Not enough seats available.');
    }

    // Calculate end time
    const startTime = new Date(); // Assuming the ride starts now
    const durationMinutes = parseInt(rideOffer.tripDuration, 10); // Duration from the RideOffer
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000); // Add duration to start time

    // Create a confirmed ride
    const confirmedRide = new ConfirmedRide({
        ride: offerRide,
        driver: {
            driverId: rideOffer.driver,
            startTime: startTime,
            duration: durationMinutes,
            endTime: endTime
        },
        offeredRideId: offerRide,
        status: 'pending',
        pickupDetails,
        dropoffDetails,
        passengers: [userProfile] // Add user profile to passengers array
    });

    await confirmedRide.save();

    // Update the RideOffer to reflect the remaining seats
    rideOffer.seatsOffered -= noOfSeatsBooked;
    await rideOffer.save();

    // Save the booking details
    const bookRide = new BookRide({
        ride: offerRide,
        user: userProfile,
        seatsBooked: noOfSeatsBooked,
        totalAmount: paymentAmount,
        paymentStatus: 'completed',
        bookingStatus: 'confirmed',
        pickupTime: pickupDetails.time,
        pickupName: pickupDetails.name,
        pickupPoint: pickupDetails.coordinates,
        dropoffName: dropoffDetails.name,
        dropoffPoint: dropoffDetails.coordinates,
        travelDate: new Date(), // Assuming current date, you might want to pass it from the request
    });

    await bookRide.save();

    return confirmedRide;
}

module.exports = { confirmBooking };
