const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentsRouter = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/fooddb';
mongoose.connect(MONGO_URI).then(()=>console.log('Payments DB connected')).catch(console.error);

app.use('/api/payments', paymentsRouter);

const PORT = process.env.PORT || 4003;
app.listen(PORT, ()=>console.log(`Payments service running on ${PORT}`));
