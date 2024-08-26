// src/config/dbConfig.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env

// Create a new Sequelize instance, connecting to your MySQL database
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // Set to true to see SQL queries in the console
});

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = db;
