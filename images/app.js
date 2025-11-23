const express = require('express');
const cors = require('cors');
const path = require('path');
const imagesRouter = require('./routes/images');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/api/images', imagesRouter);

const PORT = process.env.PORT || 4005;
app.listen(PORT, ()=>console.log(`Images service running on ${PORT}`));
