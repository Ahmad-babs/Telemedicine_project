const db = require('../database/db');

// Create a new prescription
exports.createPrescription = (req, res) => {
    const { user_id, doctor_id, medication, dosage, instructions } = req.body;

    const sql = `
        INSERT INTO prescription (user_id, doctor_id, medication, dosage, instructions) 
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [user_id, doctor_id, medication, dosage, instructions], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create prescription' });
        }
        res.status(201).json({ message: 'Prescription created successfully', prescription_id: result.insertId });
    });
};

// Get all prescriptions for a specific user
exports.getPrescriptionsByUser = (req, res) => {
    const { user_id } = req.params;

    const sql = `
        SELECT * FROM prescription 
        WHERE user_id = ?
    `;
    db.query(sql, [user_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve prescriptions' });
        }
        res.status(200).json(results);
    });
};

// Get details of a specific prescription
exports.getPrescriptionById = (req, res) => {
    const { prescription_id } = req.params;

    const sql = `
        SELECT * FROM prescription 
        WHERE prescription_id = ?
    `;
    db.query(sql, [prescription_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to retrieve prescription' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Prescription not found' });
        }
        res.status(200).json(result[0]);
    });
};

// Update a prescription
exports.updatePrescription = (req, res) => {
    const { prescription_id } = req.params;
    const { medication, dosage, instructions } = req.body;

    const sql = `
        UPDATE prescription 
        SET medication = ?, dosage = ?, instructions = ? 
        WHERE prescription_id = ?
    `;
    db.query(sql, [medication, dosage, instructions, prescription_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update prescription' });
        }
        res.status(200).json({ message: 'Prescription updated successfully' });
    });
};

// Delete a prescription
exports.deletePrescription = (req, res) => {
    const { prescription_id } = req.params;

    const sql = `
        DELETE FROM prescription 
        WHERE prescription_id = ?
    `;
    db.query(sql, [prescription_id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete prescription' });
        }
        res.status(200).json({ message: 'Prescription deleted successfully' });
    });
};
