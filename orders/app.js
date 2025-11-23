const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/fooddb';
mongoose.connect(MONGO_URI).then(()=>console.log('Orders DB connected')).catch(console.error);

app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4002;
app.listen(PORT, ()=>console.log(`Orders service running on ${PORT}`));
