// src/controllers/deleteExpense.js
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Delete an expense for a logged in user
const deleteExpense = async (req, res) => {
    const userId = req.session.userId; // Assuming the user is logged in and their ID is stored in session
    const { expenseId } = req.params; // The ID of the expense to delete

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in to delete an expense.' });
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

        await expense.destroy();

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        return res.status(500).json({ error: 'Failed to delete expense' });
    }
};

module.exports = { deleteExpense };


// // src/controllers/deleteExpense.js

// const Expense = require('../models/expenseModel');


// // Delete expense for a user
// const deleteExpense = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const expense = await Expense.findByPk(id);
//         if (!expense) {
//             return res.status(404).json({ error: 'Expense not found' });
//         }

//         await expense.destroy();

//         return res.status(200).json({ message: 'Expense deleted successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: 'Error deleting expense', details: error });
//     }
// };

// module.exports = { deleteExpense };    

