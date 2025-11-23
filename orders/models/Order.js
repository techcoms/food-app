const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  foodId: String,
  name: String,
  qty: { type: Number, default: 1 },
  price: Number
});

const OrderSchema = new mongoose.Schema({
  items: [ItemSchema],
  total: Number,
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
