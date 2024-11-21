// Importing dependencies
const express = require('express');
const db = require('./database/db');
const dotenv = require('dotenv');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');


// Use routes
app.use('/api/auth', authRoutes); // Auth routes for login and signup
app.use('/api/appointments', appointmentRoutes); // Appointment-related routes
app.use('/api/messages', messageRoutes);
app.use('/prescriptions', prescriptionRoutes);

// Test route to verify database connection
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        }
        res.send(`Database is working! Solution: ${results[0].solution}`);
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
