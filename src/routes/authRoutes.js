// src/routes/authRoutes.js

const express = require('express');
const path = require('path');
const { registerUser } = require('../controllers/register');
const { loginUser } = require('../controllers/login');
const router = express.Router();

// Route to serve the registration form
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/register.html'));
});

// Route to serve the registration form
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/login.html'));
});

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
