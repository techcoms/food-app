const express = require('express');
const cors = require('cors');

// IMPORTANT: this initializes Mongo connection
require('./models/Model');

const optionsRouter = require('./routes/options');

const app = express();

// CORS is optional behind Ingress, but OK
app.use(cors());
app.use(express.json());

// Health check (REQUIRED for Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Routes
app.use('/api/options', optionsRouter);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () =>
  console.log(`Options service running on port ${PORT}`)
);
