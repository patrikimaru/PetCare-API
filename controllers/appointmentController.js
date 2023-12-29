const Appointment = require('../models/appointmentModel');

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).json(appointment);
    } catch (error) {
      console.error('Error in createAppointment:', error);
      res.status(500).json({ error: error });
    }
  },

  getAllAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find().populate('user');
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error in getAllAppointments:', error);
      res.status(500).json({ error: error });
    }
  },

  getUnconfirmedAppointments: async (req, res) => {
    try {
      const unconfirmedAppointments = await Appointment.find({ status: 'unconfirmed' }).populate('user');
      res.status(200).json(unconfirmedAppointments);
    } catch (error) {
      console.error('Error in getUnconfirmedAppointments:', error);
      res.status(500).json({ error: error });
    }
  },

  getConfirmedAppointments: async (req, res) => {
    try {
      const confirmedAppointments = await Appointment.find({ status: 'confirmed' }).populate('user');
      res.status(200).json(confirmedAppointments);
    } catch (error) {
      console.error('Error in getConfirmedAppointments:', error);
      res.status(500).json({ error: error });
    }
  },

  getDoneAppointments: async (req, res) => {
    try {
      const doneAppointments = await Appointment.find({ status: 'done' }).populate('user');
      res.status(200).json(doneAppointments);
    } catch (error) {
      if (error instanceof mongoose.Error && error.code === 11000) {
        res.status(400).json({ error: `Email '${error.keyValue.email}' is already registered.` });
      } else {
        console.error('Error in getDoneAppointments:', error);
        res.status(500).json({ error: error });
      }
    }
  },

  confirmAppointment: async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: 'confirmed' },
        { new: true }
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error in confirmAppointment:', error);
      res.status(500).json({ error: error });
    }
  },

  markAppointmentAsDone: async (req, res) => {
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: 'done' },
        { new: true }
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error in markAppointmentAsDone:', error);
      res.status(500).json({ error: error });
    }
  },

  deleteAllAppointments: async (req, res) => {
    try {
      await Appointment.deleteMany({});
      res.status(204).end();
    } catch (error) {
      console.error('Error in deleteAllAppointments:', error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = appointmentController;
