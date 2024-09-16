 // src/routes/userRoutes.js
const express = require('express');
const { updateUserProfile, getUserProfile } = require('../controllers/updateUserProfile');
const { getUserIdFromSession } = require('../controllers/auth'); // Import the function here

const router = express.Router();

// Route to get the user's profile page
router.get('/profile/:id', getUserProfile);

// Route to update the user's profile
router.put('/profile/:id', updateUserProfile);

// Route to get user ID from the session
router.get('/getUserId', getUserIdFromSession);

 
module.exports = router;

