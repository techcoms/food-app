const mongoose = require('./Model');

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['CREATED', 'PAID', 'CANCELLED', 'COMPLETED'],
      default: 'CREATED',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
