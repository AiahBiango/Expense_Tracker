// src/controllers/calculateExpense.js

const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

// Calculate the toatal expenses for a logged in user
const getTotalExpenses = async (req, res) => {
    const userId = req.session.userId; // Assuming the user is logged in and their ID is stored in session

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in to view your total expenses.' });
    }

    try {
        // Calculate the total expenses for the logged-in user
        const totalExpenses = await Expense.sum('amount', {
            where: { user_id: userId }
        });

        return res.status(200).json({ totalExpenses });
    } catch (error) {
        console.error('Error calculating total expenses:', error);
        return res.status(500).json({ error: 'Failed to calculate total expenses' });
    }
};

module.exports = { getTotalExpenses };


// // src/controllers/Calculate.js

// const Expense = require('../models/expenseModel');

// // Calculate total expenses for a user
// const calculateTotalExpenses = async (req, res) => {
//     const userId = req.query.user_id; // Assuming user_id is passed as a query parameter

//     try {
//         const totalExpenses = await Expense.sum('amount', { where: { user_id: userId } });
        
//         res.status(200).json({ totalExpenses });
//     } catch (error) {
//         res.status(500).json({ error: 'Error calculating total expenses', details: error });
//     }
// };
// module.exports = { calculateTotalExpenses };    
