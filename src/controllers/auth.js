// src/controllers/auth.js

// Function to get user ID from the session
const getUserIdFromSession = (req, res) => {
    if (req.session.userId) {
        res.json({ userId: req.session.userId });
    } else {
        res.status(401).json({ error: 'User not logged in' });
    }
};

module.exports = { getUserIdFromSession };
