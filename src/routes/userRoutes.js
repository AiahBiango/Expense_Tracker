 // src/routes/userRoutes.js

const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/updateUserProfile');
// // Import the registerUser function from the registrationController
// const { registerUser } = require('../controllers/register');
const router = express.Router();

// Route to get the user's profile page
router.get('/profile/:id', getUserProfile);

// Route to update the user's profile
router.put('/profile/:id', updateUserProfile);

// // User registration route
// router.post('/auth/register', registerUser);

module.exports = router;

