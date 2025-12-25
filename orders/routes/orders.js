const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

/**
 * Health check (REQUIRED for Kubernetes probes)
 * GET /health
 */
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * List orders
 * GET /api/orders
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

/**
 * Create order
 * POST /api/orders
 */
router.post('/', async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || typeof total !== 'number') {
      return res.status(400).json({
        message: 'items and total are required',
      });
    }

    const order = new Order({ items, total });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create order' });
  }
});

/**
 * Get order by ID
 * GET /api/orders/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid order ID' });
  }
});

/**
 * Update order status
 * PUT /api/orders/:id/status
 */
router.put('/:id/status', async (req, res) => {
  try {
    const allowedStatuses = [
      'CREATED',
      'PAID',
      'CANCELLED',
      'COMPLETED',
    ];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of ${allowedStatuses.join(', ')}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
