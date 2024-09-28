// src/controllers/userProfile.js

const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

const getUserProfile = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        // Check the request type and respond accordingly
        if (req.headers.accept === 'application/json') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.status(401).redirect('/login');
    }

    try {
        const user = await User.findByPk(userId);
        const expenses = await Expense.findAll({ where: { user_id: userId } });
        const totalExpenses = await Expense.sum('amount', { where: { user_id: userId } });

        if (!user) {
            if (req.headers.accept === 'application/json') {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(404).redirect('/login');
        }

        // If it's a JSON request, return JSON data
        if (req.headers.accept === 'application/json') {
            return res.json({ 
                id: user.id, 
                name: user.username, // Change 'name' to 'username' to match your model
                email: user.email, 
                profilePhoto: user.profilePhoto, // Include profile photo URL
                expenses, 
                totalExpenses 
            });
        }

        // Otherwise, render the profile view
        res.render('profile', { 
            user, 
            expenses, 
            totalExpenses 
        });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        if (req.headers.accept === 'application/json') {
            return res.status(500).json({ error: 'Error retrieving user profile' });
        }
        return res.status(500).send('Error retrieving user profile');
    }
};

module.exports = { getUserProfile };









// // src/controllers/userProfile.js

// const User = require('../models/userModel');
// const Expense = require('../models/expenseModel');

// const getUserProfile = async (req, res) => {
//     const userId = req.session.userId;

//     if (!userId) {
//         // Check the request type and respond accordingly
//         if (req.headers.accept === 'application/json') {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }
//         return res.status(401).redirect('/login');
//     }

//     try {
//         const user = await User.findByPk(userId);
//         const expenses = await Expense.findAll({ where: { user_id: userId } });
//         const totalExpenses = await Expense.sum('amount', { where: { user_id: userId } });

//         if (!user) {
//             if (req.headers.accept === 'application/json') {
//                 return res.status(404).json({ error: 'User not found' });
//             }
//             return res.status(404).redirect('/login');
//         }

//         // If it's a JSON request, return JSON data
//         if (req.headers.accept === 'application/json') {
//             return res.json({ 
//                 id: user.id, 
//                 name: user.name, 
//                 email: user.email, 
//                 expenses, 
//                 totalExpenses 
//             });
//         }

//         // Otherwise, render the profile view
//         res.render('profile', { user, expenses, totalExpenses });
//     } catch (error) {
//         console.error('Error retrieving user profile:', error);
//         if (req.headers.accept === 'application/json') {
//             return res.status(500).json({ error: 'Error retrieving user profile' });
//         }
//         return res.status(500).send('Error retrieving user profile');
//     }
// };

// module.exports = { getUserProfile };
