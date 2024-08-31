const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../../models/Profile'); // Replace with your user model
const Wallet = require('../../models/Wallet'); // Replace with your wallet model
const Transaction = require('../../models/TransactionSchema'); // New model for transactions

const razorpay = new Razorpay({
  key_id: "rzp_test_uDS9YXiBUt9A51",
  key_secret: "dqOCPIc0LyBsVjw2f604csaW",
});

exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, userId, amount } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(order_id + '|' + payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === signature) {
    try {
      // Update wallet balance
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }

      wallet.balance += amount; // Assuming 'amount' is in the request body
      await wallet.save();

      // Record transaction
      const transaction = await Transaction.create({
        userId,
        walletId: wallet._id,
        amount,
        transactionType: 'credit',
        orderId: order_id,
        paymentId: payment_id,
        status: 'success',
      });

      // Update wallet's transactions array
      wallet.transactions.push(transaction._id);
      await wallet.save();

      res.json({ status: 'success', order_id, payment_id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
  }
};
