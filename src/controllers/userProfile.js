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
                name: user.name, 
                email: user.email, 
                expenses, 
                totalExpenses 
            });
        }

        // Otherwise, render the profile view
        res.render('profile', { user, expenses, totalExpenses });
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
//         return res.status(401).redirect('/login');
//     }

//     try {
//         const user = await User.findByPk(userId);
//         const expenses = await Expense.findAll({ where: { user_id: userId } });
//         const totalExpenses = await Expense.sum('amount', { where: { user_id: userId } });

//         if (!user) {
//             return res.status(404).redirect('/login');
//         }

//         res.render('profile', { user, expenses, totalExpenses }); // Pass totalExpenses to the view
//     } catch (error) {
//         console.error('Error retrieving user profile:', error);
//         return res.status(500).send('Error retrieving user profile');
//     }
// };

// module.exports = { getUserProfile };








//  // src/controllers/userProfile.js

// const User = require('../models/userModel');

// const getUserProfile = async (req, res) => {
//     const userId = req.session.userId;

//     if (!userId) {
//         return res.status(401).render('error', { message: 'Unauthorized access. Please log in to view this page.' });
//     }

//     try {
//         // Find the user by their ID
//         const user = await User.findByPk(userId, {
//             attributes: ['id', 'username', 'email', 'createdAt']
//         });

//         if (!user) {
//             return res.status(404).render('error', { message: 'User not found' });
//         }

//         // Render the profile page with user data
//         return res.render('profile', {
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             createdAt: user.createdAt
//         });
//     } catch (error) {
//         console.error('Error retrieving user profile:', error);
//         return res.status(500).render('error', { message: 'Error retrieving user profile' });
//     }
// };

// module.exports = { getUserProfile };


