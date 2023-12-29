const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a value for username.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter a value for email.'],
    trim: true,
    unique: true  
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter a value for phoneNumber.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a value for password.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
