// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

// Initialize Express app
const app = express();

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

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Session configuration (optional, if needed)
app.use(session({
    secret: 'your_secret_key', // Change to a secret key for your sessions
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Use the imported routes
app.use('/auth', authRoutes); // Mount the auth routes at /auth
app.use('/user', userRoutes); // Mount the user routes at /user

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

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


//  // import dependencies
//  const express = require('express');
//  const dotenv = require('dotenv');
//  const cors = require('cors');
//  const path = require('path'); // No need to install separately
//  const mysql = require('mysql2');
//  const session = require('express-session');
//  const crypto = require('crypto'); // No need to install separately
 
 
//  // Load environment variables
//  dotenv.config();
 
//  // middlewares
//  app.use(express.json());    // app.use(bodyParser.json());
//  app.use(express.urlencoded({ extended: true }));   // app.use(bodyParser.urlencoded({ extended: true}));
//  app.use(cors());

