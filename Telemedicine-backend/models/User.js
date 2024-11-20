const db = require('../database/db'); // Import database connection

// User model
const User = {
    // Create a new user
    create: (userData, callback) => {
        const { name, email, password } = userData;
        const query = `
            INSERT INTO users (name, email, password, created_at)
            VALUES (?, ?, ?, NOW())
        `;
        db.query(query, [name, email, password], callback);
    },

    // Find a user by email
    findByEmail: (email, callback) => {
        const query = `
            SELECT * FROM users WHERE email = ?
        `;
        db.query(query, [email], callback);
    },

    // Find a user by ID
    findById: (id, callback) => {
        const query = `
            SELECT * FROM users WHERE id = ?
        `;
        db.query(query, [id], callback);
    },
};

module.exports = User;
