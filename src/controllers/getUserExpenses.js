// src/controllers/getUserExpenses.js
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

const getUserExpenses = async (req, res) => {
    const userId = req.session.userId; // Assuming the user is logged in and their ID is stored in session

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in to view your expenses.' });
    }

    try {
        // Find all expenses for the user
        const expenses = await Expense.findAll({
            where: { user_id: userId },
            order: [['date', 'DESC']] // Order by date in descending order
        });

        return res.status(200).json({ expenses });
    } catch (error) {
        console.error('Error retrieving expenses:', error);
        return res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
};

module.exports = { getUserExpenses };




// // src/controllers/getExpense.js

// const Expense = require('../models/expenseModel');

// // Get all expenses for a user
// const getExpenses = async (req, res) => {
//     const userId = req.query.user_id; // Assuming user_id is passed as a query parameter

//     try {
//         const expenses = await Expense.findAll({ where: { user_id: userId } });
//         res.status(200).json(expenses);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch expenses', details: error });
//     }
// };

// module.exports = { getExpenses };    
