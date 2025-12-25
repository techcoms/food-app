const express = require('express');
const Option = require('../models/Option');

const router = express.Router();

/**
 * Health check (REQUIRED for Kubernetes probes)
 * GET /health
 */
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * Get all options
 * GET /api/options
 */
router.get('/', async (req, res) => {
  try {
    const options = await Option.find();
    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch options' });
  }
});

/**
 * Create option
 * POST /api/options
 */
router.post('/', async (req, res) => {
  try {
    const option = new Option(req.body);
    await option.save();
    res.status(201).json(option);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create option' });
  }
});

module.exports = router;
