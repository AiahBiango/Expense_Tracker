// src/controllers/expenseController.js

const Expense = require('../models/expenseModel');

// Create a new expense
const createExpense = async (req, res) => {
    const { amount, description, category, date } = req.body;
    const user_id = req.user.id; // Assuming req.user is populated by authentication middleware

    try {
        const newExpense = await Expense.create({
            user_id, // Use the user_id from the authenticated user
            amount,
            description,
            category,
            date: date || new Date() // Use the current date if no date is provided
        });

        return res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating expense', details: error.message });
    }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
    const userId = req.query.user_id; // Assuming user_id is passed as a query parameter

    try {
        const expenses = await Expense.findAll({ where: { user_id: userId } });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses', details: error });
    }
};

// Update an expense for a user
const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;

    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        expense.amount = amount || expense.amount;
        expense.description = description || expense.description;
        expense.category = category || expense.category;
        expense.date = date || expense.date;

        await expense.save();

        return res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating expense', details: error });
    }
};

// Delete expense for a user
const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await expense.destroy();

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting expense', details: error });
    }
};

// Calculate total expenses for a user
const calculateTotalExpenses = async (req, res) => {
    const userId = req.query.user_id; // Assuming user_id is passed as a query parameter

    try {
        const totalExpenses = await Expense.sum('amount', { where: { user_id: userId } });
        
        res.status(200).json({ totalExpenses });
    } catch (error) {
        res.status(500).json({ error: 'Error calculating total expenses', details: error });
    }
};
module.exports = { createExpense, getExpenses, updateExpense, deleteExpense, calculateTotalExpenses};    
