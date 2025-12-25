const express = require('express');
const cors = require('cors');
const path = require('path');

const imagesRouter = require('./routes/images');

const app = express();

// Optional in Ingress, but OK to keep
app.use(cors());
app.use(express.json());

// Health check (REQUIRED for Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve uploaded images
// MUST match the directory used in routes (multer)
app.use(
  '/api/images',
  express.static('/data/uploads')
);

// API routes
app.use('/api/images', imagesRouter);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () =>
  console.log(`Images service running on port ${PORT}`)
);
