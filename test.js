const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Dotenv config result:", result.parsed);
}

console.log("Secret key:", process.env.SESSION_SECRET);