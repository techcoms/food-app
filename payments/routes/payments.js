const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { v4: uuidv4 } = require('uuid');

// list payments
router.get('/', async (req,res)=>{
  const list = await Payment.find().sort({createdAt:-1});
  res.json(list);
});

// charge (mock)
router.post('/charge', async (req,res)=>{
  const { orderId, amount, method } = req.body;
  const txId = uuidv4();
  const payment = new Payment({ orderId, amount, method, status:'paid', txId });
  await payment.save();
  res.json({ status:'paid', txId, id: payment._id });
});

module.exports = router;
