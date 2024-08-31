// src/routes/expenseRoutes.js

const express = require('express');
const path = require('path');
const {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
    calculateTotalExpenses
} = require('../controllers/expense');

const router = express.Router();

// Route to serve the createExpense form
router.get('/add_expense', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/html/createExpense.html'));
});

// Route to create a new expense
router.post('/add_expense', createExpense);

// Route to get all expenses for a user
router.get('/', getExpenses);

// Route to update an expense
router.put('/:id', updateExpense);

// Route to delete an expense
router.delete('/:id', deleteExpense);

// Calculate total expenses for a user
router.get('/total', calculateTotalExpenses); 


module.exports = router;
