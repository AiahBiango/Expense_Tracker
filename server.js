// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const routes = require('./src/routes/index'); // Import the main routes file

const memoryStore = require('memorystore')(session); // import and configure memorystor
const crypto = require('crypto');

// Initialize Express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve ejs templates files
app.set('views', path.join(__dirname, 'src', 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Import models
const User = require('./src/models/userModel');
const Expense = require('./src/models/expenseModel');

// Load environment variables
dotenv.config();

// Use SESSION_SECRET in .env file if available, if not, Generate a random secret key for sessions
 const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(128).toString('hex');

// Session configuration (optional, if needed)
app.use(session({
    secret: secretKey,
    resave: false,  // Don't save session if unmodified
    saveUninitialized: false,  // To avoid creating empty session, ie save only session with data
    store: new memoryStore({
        checkPeriod: 3600000 // prune expire entries every one hour
    }),
    cookie: { secure: false, httpOnly: true } // Secure: false for non-HTTPS; true in production with HTTPS
}));

// Middleware
app.use(express.json()); // For parsing application/json bodies
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Mount routes
app.use('/', routes); // Mount the routes from 'src/routes/index.js'

// Test database connection
const db = require('./src/config/dbConfig');
db.authenticate()
    .then(() => {
        console.log('Database connected...');
        // Sync models with database
        return db.sync(); // This will create tables if they don't exist
    })
    .then(() => console.log('Tables created if they did not exist'))
    .catch(err => console.log('Error: ' + err));
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

