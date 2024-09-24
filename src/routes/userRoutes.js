 // src/routes/userRoutes.js
const express = require('express');
const path = require('path');
const { updateUserProfile} = require('../controllers/updateUserProfile');
const { getUserProfile } = require('../controllers/userProfile')
const { getUserIdFromSession } = require('../controllers/auth'); // Import the function here
const { authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router();

// Route to get the user's profile page by going through the authenticated middleware
router.get('/profile',authMiddleware, getUserProfile);

// Route to update the user's profile
router.put('/profile/:id', updateUserProfile);

// // Route to get user ID from the session
// router.get('/getUserId', getUserIdFromSession);

 
module.exports = router;

