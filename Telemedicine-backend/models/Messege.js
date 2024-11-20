// models/Message.js
const db = require('../database/db');

// Function to save a message to the database
const saveMessage = async (name, email, message) => {
    const query = `
        INSERT INTO Messages (name, email, message)
        VALUES (?, ?, ?);
    `;
    try {
        const [result] = await db.promise().query(query, [name, email, message]);
        return result.insertId; // Return the ID of the inserted message
    } catch (err) {
        throw new Error('Error saving message: ' + err.message);
    }
};

// Function to retrieve all messages from the database
const getAllMessages = async () => {
    const query = `
        SELECT * FROM Messages ORDER BY created_at DESC;
    `;
    try {
        const [rows] = await db.promise().query(query);
        return rows; // Return the fetched messages
    } catch (err) {
        throw new Error('Error fetching messages: ' + err.message);
    }
};

module.exports = {
    saveMessage,
    getAllMessages,
};
