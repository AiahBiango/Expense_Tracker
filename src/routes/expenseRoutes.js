// src/routes/expenseRoutes.js

const express = require('express');
const path = require('path');

const { createExpense } = require('../controllers/createExpense');
const { getUserExpenses } = require('../controllers/getUserExpenses');
const { updateExpense } = require('../controllers/updateExpense');
const { deleteExpense } = require('../controllers/deleteExpense');
const { getTotalExpenses } = require('../controllers/getTotalExpenses');
const { authMiddleware } = require('../middlewares/authMiddleware')
 

const router = express.Router();

// Create a new expense - show the form
router.get('/add_expense', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/createExpense.html'));
});

// Route to create a new expense
router.post('/add_expense', authMiddleware, createExpense);

// Route to get all expenses for a user
router.get('/get_expenses', authMiddleware, getUserExpenses);

// Route to update an expense
router.put('/:expenseId', authMiddleware, updateExpense);

// Route to delete an expense
router.delete('/:expenseId', authMiddleware, deleteExpense);

// Calculate total expenses for a user
router.get('/total', getTotalExpenses); 


module.exports = router;
