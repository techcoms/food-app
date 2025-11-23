const express = require('express');
const router = express.Router();
const Option = require('../models/Option');

router.get('/', async (req,res)=> {
  const items = await Option.find();
  res.json(items);
});

router.post('/', async (req,res)=> {
  const it = new Option(req.body);
  await it.save();
  res.status(201).json(it);
});

module.exports = router;
