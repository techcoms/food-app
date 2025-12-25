const express = require('express');
const cors = require('cors');

// Initialize Mongo connection ONCE
require('./models/Model');

const paymentsRouter = require('./routes/payments');

const app = express();

// CORS optional behind Ingress, but OK
app.use(cors());
app.use(express.json());

// Health check (REQUIRED for Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/api/payments', paymentsRouter);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () =>
  console.log(`Payments service running on port ${PORT}`)
);
