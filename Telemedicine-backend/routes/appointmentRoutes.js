// Importing dependencies
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Route to create a new appointment
router.post('/create', appointmentController.createAppointment);

// Route to get appointments by user ID
router.get('/user/:user_id', appointmentController.getAppointmentsByUser);

module.exports = router;
