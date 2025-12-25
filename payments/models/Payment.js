const mongoose = require('./Model');

const paymentSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  status: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
