// db.js
const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB connection URL from the environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;