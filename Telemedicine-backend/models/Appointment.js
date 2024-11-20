const db = require('../database/db'); // Import database connection

// Appointment model
const Appointment = {
    // Create a new appointment
    create: (appointmentData, callback) => {
        const { user_id, service, appointment_date, appointment_time } = appointmentData;
        const query = `
            INSERT INTO appointments (user_id, service, appointment_date, appointment_time, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        db.query(query, [user_id, service, appointment_date, appointment_time], callback);
    },

    // Get all appointments for a specific user
    findByUserId: (user_id, callback) => {
        const query = `
            SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date ASC
        `;
        db.query(query, [user_id], callback);
    },

    // Get a specific appointment by ID
    findById: (id, callback) => {
        const query = `
            SELECT * FROM appointments WHERE id = ?
        `;
        db.query(query, [id], callback);
    },

    // Update an appointment
    update: (id, updatedData, callback) => {
        const { service, appointment_date, appointment_time } = updatedData;
        const query = `
            UPDATE appointments 
            SET service = ?, appointment_date = ?, appointment_time = ?
            WHERE id = ?
        `;
        db.query(query, [service, appointment_date, appointment_time, id], callback);
    },

    // Delete an appointment
    delete: (id, callback) => {
        const query = `
            DELETE FROM appointments WHERE id = ?
        `;
        db.query(query, [id], callback);
    },
};

module.exports = Appointment;
