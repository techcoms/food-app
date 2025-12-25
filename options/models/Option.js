const mongoose = require('./Model');

const optionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Option', optionSchema);
