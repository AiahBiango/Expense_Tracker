// src/controllers/createExpense.js

const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Create a new expense for a logged in user
const createExpense = async (req, res) => {
    const { amount, description, category, date } = req.body;
    const userId = req.session.userId; // Assuming the user is logged in and their ID is stored in session

    // Log user_id from session
    console.log("User Id from session: ", userId);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in to add an expense.' });
    }

    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new expense
        const newExpense = await Expense.create({
            user_id: userId,
            amount,
            description,
            category,
            date: date || new Date(),
        });

        return res.status(201).json({ message: 'Expense created successfully', expense: newExpense, redirectTo: './profile' });
    } catch (error) {
        console.error('Error creating expense:', error);
        return res.status(500).json({ error: 'Failed to create expense' });
    }
};

module.exports = { createExpense };
 