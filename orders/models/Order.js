const mongoose = require('./Model');

const orderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  status: { type: String, default: 'CREATED' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
