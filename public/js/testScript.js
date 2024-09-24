// const bcrypt = require('bcrypt');

// const testPassword = 'EABProgress@301'; // User plain password
// const storedHash = '$2b$10$B9x01gJJBnrmvNCYI/u/1eunshvNSUH5tsPhP/d3TdPGJzt6D1ldG'; // The stored hash

// bcrypt.compare(testPassword, storedHash, (err, result) => {
//     if (err) throw err;
//     console.log('Passwords match:', result); // Should log true if they match
// }); 



// require('dotenv').config();
// console.log("Secrete key: ", process.env.SESSION_SECRET);


const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Dotenv config result:", result.parsed);
}

console.log("Secret key:", process.env.SESSION_SECRET);
