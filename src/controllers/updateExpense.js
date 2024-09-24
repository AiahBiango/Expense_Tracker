// src/controllers/updateExpense.js
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Update an expense for a logged in user
const updateExpense = async (req, res) => {
    const userId = req.session.userId; // Assuming the user is logged in and their ID is stored in session
    const { expenseId } = req.params; // The ID of the expense to update
    const { amount, description, category, date } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in to update an expense.' });
    }

    try {
        // Find the expense by ID and ensure it belongs to the user
        const expense = await Expense.findOne({
            where: {
                id: expenseId,
                user_id: userId
            }
        });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found or unauthorized' });
        }

        // Update the expense details
        expense.amount = amount || expense.amount;
        expense.description = description || expense.description;
        expense.category = category || expense.category;
        expense.date = date || expense.date;

        await expense.save();

        return res.status(200).json({ message: 'Expense updated successfully', expense });
    } catch (error) {
        console.error('Error updating expense:', error);
        return res.status(500).json({ error: 'Failed to update expense' });
    }
};

module.exports = { updateExpense };




// // src/controllers/updateExpense.js
// const Expense = require('../models/expenseModel');

// // Update an expense for a user
// const updateExpense = async (req, res) => {
//     const { id } = req.params;
//     const { amount, description, category, date } = req.body;

//     try {
//         const expense = await Expense.findByPk(id);
//         if (!expense) {
//             return res.status(404).json({ error: 'Expense not found' });
//         }

//         expense.amount = amount || expense.amount;
//         expense.description = description || expense.description;
//         expense.category = category || expense.category;
//         expense.date = date || expense.date;

//         await expense.save();

//         return res.status(200).json({ message: 'Expense updated successfully', expense });
//     } catch (error) {
//         return res.status(500).json({ error: 'Error updating expense', details: error });
//     }
// };

// module.exports = { updateExpense };    
