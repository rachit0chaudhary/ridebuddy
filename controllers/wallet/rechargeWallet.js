const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../../models/Profile'); // User model
const Wallet = require('../../models/Wallet'); // Wallet model
const Transaction = require('../../models/TransactionSchema'); // Transaction model

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_uDS9YXiBUt9A51", // Replace with your Razorpay key_id
  key_secret: "dqOCPIc0LyBsVjw2f604csaW", // Replace with your Razorpay key_secret
});

// Create an order
exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise for INR
    currency,
    receipt: `receipt_${Date.now()}`, // Unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options); // Create order with Razorpay
    res.json(order); // Send the order details to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Verify payment and update wallet
exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, userId, amount } = req.body;

  // Create HMAC using Razorpay secret to verify the payment signature
  const hmac = crypto.createHmac('sha256', "dqOCPIc0LyBsVjw2f604csaW"); // Ensure you replace with your actual secret key
  hmac.update(order_id + '|' + payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === signature) {
    try {
      // Find the user's wallet
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }

      // Update wallet balance
      wallet.balance += amount; // Add the credited amount to the wallet balance
      await wallet.save();

      // Record the transaction
      const transaction = await Transaction.create({
        userId,
        walletId: wallet._id,
        amount,
        transactionType: 'credit', // Indicate that this is a credit transaction
        orderId: order_id,
        paymentId: payment_id,
        status: 'success',
      });

      // Associate the transaction with the wallet
      wallet.transactions.push(transaction._id);
      await wallet.save();

      // Respond with success status
      res.json({ status: 'success', order_id, payment_id });
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle errors during wallet or transaction update
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
  }
};
