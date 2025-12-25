const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { v4: uuidv4 } = require('uuid');

/**
 * Health check (REQUIRED for Kubernetes probes)
 * GET /health
 */
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * List payments
 * GET /api/payments
 */
router.get('/', async (req, res) => {
  try {
    const list = await Payment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
});

/**
 * Charge payment (mock)
 * POST /api/payments/charge
 */
router.post('/charge', async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || typeof amount !== 'number') {
      return res.status(400).json({
        message: 'orderId and amount are required',
      });
    }

    const txId = uuidv4();

    const payment = new Payment({
      orderId,
      amount,
      status: 'SUCCESS',
    });

    await payment.save();

    res.json({
      status: 'SUCCESS',
      txId,
      paymentId: payment._id,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Payment failed' });
  }
});

module.exports = router;
