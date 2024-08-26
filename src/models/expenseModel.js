const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig'); // Import the configured Sequelize instance
const User = require('./userModel'); // Import the User model

// Define the Expense model
const Expense = db.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference to the User model
            key: 'id',   // Key in the User model
        },
        onDelete: 'CASCADE', // Delete expenses if the associated user is deleted
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0, // Ensure the amount is a non-negative value
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for categorizing the expense
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default to current date and time
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'expenses',
    timestamps: true, // Enables automatic management of createdAt and updatedAt
});

// Set up the association
Expense.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user', // Optional alias for the association
});

module.exports = Expense;
