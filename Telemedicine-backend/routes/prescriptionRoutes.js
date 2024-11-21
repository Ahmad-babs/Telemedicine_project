const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

// Route to create a new prescription
router.post('/create', prescriptionController.createPrescription);

// Route to get all prescriptions for a specific user
router.get('/user/:user_id', prescriptionController.getPrescriptionsByUser);

// Route to get details of a specific prescription
router.get('/:prescription_id', prescriptionController.getPrescriptionById);

// Route to update a prescription
router.put('/:prescription_id', prescriptionController.updatePrescription);

// Route to delete a prescription
router.delete('/:prescription_id', prescriptionController.deletePrescription);

module.exports = router;
