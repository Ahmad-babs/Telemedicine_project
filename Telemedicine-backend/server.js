// Importing dependencies
const express = require('express');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());


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
