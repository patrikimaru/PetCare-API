const Appointment = require('../models/appointmentModel');

const appointmentController = {
  createAppointment: async (req, res) => {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  },

  getAllAppointments: async (req, res) => {
    const appointments = await Appointment.find().populate('user');
    res.status(200).json(appointments);
  },

  getUnconfirmedAppointments: async (req, res) => {
    const unconfirmedAppointments = await Appointment.find({ status: 'unconfirmed' }).populate('user');
    res.status(200).json(unconfirmedAppointments);
  },

  getConfirmedAppointments: async (req, res) => {
    const confirmedAppointments = await Appointment.find({ status: 'confirmed' }).populate('user');
    res.status(200).json(confirmedAppointments);
  },

  getDoneAppointments: async (req, res) => {
    const doneAppointments = await Appointment.find({ status: 'done' }).populate('user');
    res.status(200).json(doneAppointments);
  },

  confirmAppointment: async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );
    res.status(200).json(appointment);
  },

  markAppointmentAsDone: async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'done' },
      { new: true }
    );
    res.status(200).json(appointment);
  },

  deleteAllAppointments: async (req, res) => {
    await Appointment.deleteMany({});
    res.status(204).end();
  },
};

module.exports = appointmentController;
