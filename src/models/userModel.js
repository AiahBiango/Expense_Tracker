// src/models/userModel.js

const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig'); // Import the configured Sequelize instance
const bcrypt = require('bcrypt');

// Define the User model
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'users', // Specify the table name
    timestamps: true, // Enables automatic management of createdAt and updatedAt
});

module.exports = User;




 
// User.beforeCreate(async (user, options) => {
//     //password hashing
//     const salt = await bcrypt.genSalt(10); // Generate salt asynchronously
//     user.password = await bcrypt.hash(user.password, salt); // Hash the password asynchronously
// });
