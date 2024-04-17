const mongoose = require('mongoose');

async function connectDB(url) {
  try {
    await mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database connected successfully:', url);
  } catch (error) {
    console.error('Database connection failed:', url, error);
  }
}

module.exports = { connectDB };
