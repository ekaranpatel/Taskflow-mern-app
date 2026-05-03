 const mongoose = require('mongoose');

// This defines exactly what a "User" looks like in your MongoDB[cite: 1, 4]
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);