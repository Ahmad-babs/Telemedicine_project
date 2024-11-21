// Importing db
const db = require('../database/db');

// Controller to handle appointment-related logic
const createAppointment = async (req, res) => {
    const { user_id, service, appointment_date, appointment_time, message } = req.body;

    if (!user_id || !service || !appointment_date || !appointment_time) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
    }

    try {
        const query = `
            INSERT INTO appointments (user_id, service, appointment_date, appointment_time, message)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [user_id, service, appointment_date, appointment_time, message || null];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error creating appointment:', err);
                return res.status(500).json({ message: 'Error creating appointment' });
            }
            res.status(201).json({ message: 'Appointment created successfully', appointment_id: results.insertId });
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAppointmentsByUser = (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const query = `SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC`;
        db.query(query, [user_id], (err, results) => {
            if (err) {
                console.error('Error fetching appointments:', err);
                return res.status(500).json({ message: 'Error fetching appointments' });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAppointment,
    getAppointmentsByUser,
};
