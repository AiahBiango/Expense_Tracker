// src/controllers/expenseController.js

const Expense = require('../models/expenseModel');

const createExpense = async (req, res) => {
    const { user_id, amount, description, category, date } = req.body;

    try {
        const newExpense = await Expense.create({
            user_id,
            amount,
            description,
            category,
            date: date || new Date()
        });

        return res.status(201).json({ message: 'Expense created successfully', expense: newExpense });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating expense', details: error });
    }
};

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

module.exports = { createExpense, updateExpense, deleteExpense };
