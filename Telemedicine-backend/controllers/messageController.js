const db = require('../database/db');

// Controller to handle sending a new message
exports.sendMessage = (req, res) => {
    const { sender_id, receiver_id, content } = req.body;

    if (!sender_id || !receiver_id || !content) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        INSERT INTO messages (sender_id, receiver_id, content, created_at)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [sender_id, receiver_id, content], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to send message', error: err.message });
        }
        res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
    });
};

// Controller to retrieve all messages for a user
exports.getMessagesByUser = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT * FROM messages
        WHERE sender_id = ? OR receiver_id = ?
        ORDER BY created_at DESC
    `;

    db.query(query, [userId, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
        }
        res.status(200).json({ messages: results });
    });
};
