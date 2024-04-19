const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  authorized: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;