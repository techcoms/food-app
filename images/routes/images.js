const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname.replace(/\s+/g,'_');
    cb(null, name);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('image'), (req,res)=>{
  if (!req.file) return res.status(400).send('No file');
  res.json({ filename: req.file.filename, url: `/images/${req.file.filename}` });
});

router.get('/', (req,res)=>{
  const files = fs.readdirSync(uploadDir);
  res.json(files.map(f=>({ filename: f, url: `/images/${f}` })));
});

module.exports = router;
