const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  createAppointment,
  getAllAppointments,
  getUnconfirmedAppointments,
  getConfirmedAppointments,
  getDoneAppointments,
  confirmAppointment,
  markAppointmentAsDone,
  deleteAllAppointments,
} = require('../controllers/appointmentController');

const router = express.Router();

router.use(authenticateToken);

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.get('/unconfirmed', getUnconfirmedAppointments);
router.get('/confirmed', getConfirmedAppointments);
router.get('/done', getDoneAppointments);
router.put('/confirm/:id', confirmAppointment);
router.put('/done/:id', markAppointmentAsDone);
router.delete('/', deleteAllAppointments);

module.exports = router;
