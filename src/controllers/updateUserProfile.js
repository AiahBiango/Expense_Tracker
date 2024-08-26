 // src/controllers/updateUserProfile.js

const User = require('../models/userModel');

// Function to update the user's profile
const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();

        return res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating profile', details: error });
    }
};

// Function to fetch and display the user's profile
const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching profile', details: error });
    }
};

module.exports = { updateUserProfile, getUserProfile };
