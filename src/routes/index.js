// src/routes/index.js

const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');
const userRoutes = require('./userRoutes');

// Mount routes with prefixes
router.use('/auth', authRoutes); // Handles routes like /auth/login, /auth/register
router.use('/expenses', expenseRoutes); // Handles routes like /expenses/create_expense, /expenses/:id
router.use('/user', userRoutes); // Handles routes like /user/profile

module.exports = router;
