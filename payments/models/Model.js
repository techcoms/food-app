const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

// Prevent multiple connections
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.on('connected', () => {
  console.log('Payments MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Payments MongoDB connection error:', err);
});

module.exports = mongoose;
