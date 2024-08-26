// src/controllers/loginController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if password is correct
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Attach session data
        req.session.userId = user.id;
        req.session.userEmail = user.email;

        // Send back the token and redirect URL
        return res.status(200).json({
            message: 'Login successful',
            token,
            redirectTo: `/user/profile/${user.id}` // Redirect to the user's profile page
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error logging in', details: error });
    }
};

module.exports = { loginUser };
