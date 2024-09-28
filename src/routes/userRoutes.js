 // src/routes/userRoutes.js
const express = require('express');
const path = require('path');
// const { updateUserProfile } = require('../controllers/updateUserProfile');
const { updateUserProfile} = require('../controllers/updateUserProfile');
const { getUserProfile } = require('../controllers/userProfile');
// const { getUserIdFromSession } = require('../controllers/auth'); // Import the function here
const { authMiddleware } = require('../middlewares/authMiddleware');
const upload  = require('../middlewares/upload');

const { uploadProfilePhoto } = require('../controllers/userProfilePhoto');
const router = express.Router();

// Route to get the user's profile page by going through the authenticated middleware
router.get('/profile',authMiddleware, getUserProfile);

// Route to upload and update profile photo
router.post('/profile/photo', authMiddleware, upload.single('profilePhoto'), uploadProfilePhoto);
 
module.exports = router;