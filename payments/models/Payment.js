const mongoose = require('./Model');

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['INITIATED', 'SUCCESS', 'FAILED'],
      default: 'INITIATED',
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Payment ||
  mongoose.model('Payment', paymentSchema);
