const express = require('express');
const router = express.Router();
const { sendMessage, getMessagesByUser } = require('../controllers/messageController');

// Route to send a new message
router.post('/send', sendMessage); // Endpoint: POST /api/messages/send

// Route to get all messages for a user
router.get('/user/:userId', getMessagesByUser); // Endpoint: GET /api/messages/user/:userId

module.exports = router;
