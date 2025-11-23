const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// list
router.get('/', async (req,res)=>{
  const orders = await Order.find().sort({createdAt:-1});
  res.json(orders);
});

// create
router.post('/', async (req,res)=>{
  const { items, total } = req.body;
  const order = new Order({ items, total });
  await order.save();
  res.status(201).json(order);
});

// get
router.get('/:id', async (req,res)=>{
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).send('Not found');
  res.json(order);
});

// update status
router.put('/:id/status', async (req,res)=>{
  const order = await Order.findById(req.params.id);
  if(!order) return res.status(404).send('Not found');
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});

module.exports = router;
