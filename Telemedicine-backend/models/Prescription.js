// models/Prescription.js
const db = require('../database/db');

// Function to create a new prescription
const createPrescription = async (patientId, doctorId, prescriptionDetails) => {
    const query = `
        INSERT INTO Prescriptions (patient_id, doctor_id, prescription_details)
        VALUES (?, ?, ?);
    `;
    try {
        const [result] = await db.promise().query(query, [patientId, doctorId, prescriptionDetails]);
        return result.insertId; // Return the ID of the inserted prescription
    } catch (err) {
        throw new Error('Error creating prescription: ' + err.message);
    }
};

// Function to get prescriptions by patient ID
const getPrescriptionsByPatient = async (patientId) => {
    const query = `
        SELECT * FROM Prescriptions WHERE patient_id = ? ORDER BY created_at DESC;
    `;
    try {
        const [rows] = await db.promise().query(query, [patientId]);
        return rows; // Return prescriptions for the patient
    } catch (err) {
        throw new Error('Error fetching prescriptions: ' + err.message);
    }
};

// Function to get prescriptions by doctor ID
const getPrescriptionsByDoctor = async (doctorId) => {
    const query = `
        SELECT * FROM Prescriptions WHERE doctor_id = ? ORDER BY created_at DESC;
    `;
    try {
        const [rows] = await db.promise().query(query, [doctorId]);
        return rows; // Return prescriptions for the doctor
    } catch (err) {
        throw new Error('Error fetching prescriptions: ' + err.message);
    }
};

module.exports = {
    createPrescription,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
};
