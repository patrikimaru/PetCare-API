const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  dogCategory: {
    type: String,
    trim: true,
    enum: ['small', 'medium', 'big', 'super'],
    required: [true, 'Please add the dog category for the appointment'],
  },
  service: {
    type: String,
    trim: true,
    enum: ['basic', 'premium', 'royal'],
    required: [true, 'Please add the service for the appointment'],
  },
  schedule: {
    type: Date,
    trim: true,
    required: [true, 'Please add the schedule for the appointment'],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'Please add the price for the appointment'],
  },
  status: {
    type: String,
    enum: ['unconfirmed', 'confirmed', 'done'],
    default: 'unconfirmed',
    trim: true,
    required: [true, 'Please add the status for the appointment'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: [true, 'Please add a user id'],
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
