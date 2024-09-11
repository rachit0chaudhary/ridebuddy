const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../../models/Profile'); // User model
const Wallet = require('../../models/Wallet'); // Wallet model
const Transaction = require('../../models/TransactionSchema'); // Transaction model

const razorpay = new Razorpay({
  key_id: "rzp_test_uDS9YXiBUt9A51", // Replace with your Razorpay key_id
  key_secret: "dqOCPIc0LyBsVjw2f604csaW", // Replace with your Razorpay key_secret
});

// Create an order and generate payment link
exports.createOrder = async (req, res) => {
  const { amount, currency, userId } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise for INR
    currency,
    receipt: `receipt_${Date.now()}`, // Unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options); // Create order with Razorpay

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    }); // Send the order ID and other details to the frontend
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

// Create an order and generate payment linkexports.verifyPayment = async (req, res) => {
  exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature, userId, amount } = req.body;
  
    // Generate HMAC for signature validation
    const hmac = crypto.createHmac('sha256', razorpay.key_secret);
    hmac.update(order_id + '|' + payment_id);
    const generated_signature = hmac.digest('hex');
  
    if (generated_signature === signature) {
      try {
        // Find the user's wallet
        let wallet = await Wallet.findOne({ userId });
  
        // If no wallet exists, create one
        if (!wallet) {
          wallet = new Wallet({
            userId,
            balance: 0, // Initialize with a 0 balance
            transactions: [], // Initialize an empty transaction array
          });
          await wallet.save();
        }
  
        // Update wallet balance
        wallet.balance += amount;
        await wallet.save();
  
        // Create a new transaction
        const transaction = await Transaction.create({
          userId,
          walletId: wallet._id,
          amount,
          transactionType: 'credit', // 'credit' for payment received
          orderId: order_id,
          paymentId: payment_id,
          status: 'success', // Status of the payment verification
        });
  
        // Add transaction to the wallet's transaction list
        wallet.transactions.push(transaction._id);
        await wallet.save();
  
        // Respond with success
        res.json({ status: 'success', order_id, payment_id });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
    }
  };