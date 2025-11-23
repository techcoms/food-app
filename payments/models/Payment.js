const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  method: String,
  status: String,
  txId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
