const express = require('express');
const cors = require('cors');

// Initialize Mongo connection ONCE
require('./models/Model');

const ordersRouter = require('./routes/orders');

const app = express();

// CORS is optional behind Ingress, but OK
app.use(cors());
app.use(express.json());

// Health check (REQUIRED for Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () =>
  console.log(`Orders service running on port ${PORT}`)
);
