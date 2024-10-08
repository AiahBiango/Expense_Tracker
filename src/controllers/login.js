// src/controllers/login.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        // // Convert to lowercase
        // const searchValue = emailOrUsername.toLowerCase();

        // Check if user exists by email or username (both in lowercase)
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    // { email: searchValue },
                    // { username: searchValue }
                    { email: emailOrUsername },
                    { username: emailOrUsername }

                ]
            }
        });

        if (!user) {
            // console.log('User not found for:', searchValue);
            console.log('User not found for:', emailOrUsername);
            return res.status(400).json({ error: 'User not found' });
        }

        // Log the found user for debugging
        console.log('User found:', user);

        // Log raw input password and hashed password for comparison
        console.log('User input password:', password);
        console.log('Stored hashed password:', user.password);
        console.log('Stored hash length:', user.password.length); // Should be 60
        // Check bcrypt version during login
        console.log('Bcrypt version:', bcrypt.version || "version property not available");

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log('Password mismatch for user:', searchValue);
            console.log('Password mismatch for user:', emailOrUsername);
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Use SESSION_SECRET in .env file if available, if not, Generate a random secret key for sessions
        const secretKey = process.env.JWT_SECRET || process.env.SESSION_SECRET;

        if (!secretKey) {
            console.log("JWT or session secret key not set.")
            return res.status(500).json({ error: 'Server error: missing secret key.' });

        }

        // Generate a JWT token
        const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '1h'});

        // Attach session data
        req.session.userId = user.id;
        req.session.userEmail = user.email;

        // Save session manually before sending response
        req.session.save((err) => {
            if (err) {
                console.error('Failed to save session:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }

            // Print session data for verification
            console.log('Session data after login:', req.session);

            // Generate the redirect URL based on the user's ID
            const redirectUrl = "/user/profile";

            // Send back the token and redirect URL
            return res.status(200).json({
                message: 'Login successful',
                token,
                redirectTo: redirectUrl // Send the user's specific profile url and Redirect to the user's profile page
            });
        });

    } catch (error) {
        return res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};

module.exports = { loginUser };
