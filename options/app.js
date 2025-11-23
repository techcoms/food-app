const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const optionsRouter = require('./routes/options');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/fooddb';
mongoose.connect(MONGO_URI).then(()=>console.log('Options DB connected')).catch(console.error);

app.use('/api/options', optionsRouter);

const PORT = process.env.PORT || 4004;
app.listen(PORT, ()=>console.log(`Options service running on ${PORT}`));
