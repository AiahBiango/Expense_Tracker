const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// src/controllers/register.js
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Convert to lowercase
        const normalizedEmail = email.toLowerCase();
        const normalizedUsername = username.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: normalizedEmail } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log('Stored hash length:', hashedPassword.length); // Should be 60

        // Compare both the user provided password and the hashed password right after registration
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log('Immediate password match after registration:', isMatch);


        // Check bcrypt version during registration
        console.log("Bcrypt Version:", bcrypt.version || "version propeerty not available.");


        // Create the new user
        const newUser = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Redirect to login route
        return res.status(201).json({
            message: 'User registered successfully. Please log in.',
            redirectTo: './login'
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user', details: error });
    }
};

module.exports = { registerUser };
