// src/controllers/register.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Redirect to login route
        return res.status(201).json({ 
            message: 'User registered successfully. Please log in.',
            redirectTo: '/login' // This assumes you have a '/login' route in your app
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user', details: error });
    }
};

module.exports = { registerUser };
