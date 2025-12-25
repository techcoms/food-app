const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * IMPORTANT:
 * Use a fixed writable directory (mounted via PVC later)
 */
const uploadDir = '/data/uploads';

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Multer storage
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName =
      Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safeName);
  },
});

const upload = multer({ storage });

/**
 * Health check (REQUIRED for Kubernetes probes)
 */
router.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * Upload image
 * POST /api/images
 */
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    filename: req.file.filename,
    url: `/api/images/${req.file.filename}`,
  });
});

/**
 * List images
 * GET /api/images
 */
router.get('/', (req, res) => {
  const files = fs.readdirSync(uploadDir);
  res.json(
    files.map((f) => ({
      filename: f,
      url: `/api/images/${f}`,
    }))
  );
});

/**
 * Serve image file
 * GET /api/images/:filename
 */
router.get('/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.sendFile(filePath);
});

module.exports = router;
