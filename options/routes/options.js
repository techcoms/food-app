const express = require('express');
const Option = require('../models/Option');

const router = express.Router();

router.get('/api/options', async (req, res) => {
  const options = await Option.find();
  res.json(options);
});

router.post('/api/options', async (req, res) => {
  const option = new Option(req.body);
  await option.save();
  res.status(201).json(option);
});

module.exports = router;
