// src/controllers/userProfilePhoto.js
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');

const uploadProfilePhoto = async (req, res) => {
    try {
        const userId = req.session.userId; // Get user id if session stores userId
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the photo was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Define the directory where photos should be saved
        const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'profile_photos');

        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
        }

        // Update the user's profile photo path in the database
        user.profilePhoto = `/uploads/profile_photos/${req.file.filename}`;
        await user.save();

        // Redirect to the profile page after successful upload
        res.redirect('/user/profile');
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).json({ message: 'Error uploading profile photo' });
    }
};

module.exports = {
    uploadProfilePhoto,
};
