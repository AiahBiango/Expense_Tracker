// const bcrypt = require('bcrypt');

// const testPassword = 'EAPBiango@301'; // The password you believe is correct
// const storedHash = '$2b$10$dwAl.g1upC8EYYJvv.0AhuD9l2jLmG9KSRGpsB5oUVYsbdMaT1tvW'; // The stored hash

// bcrypt.compare(testPassword, storedHash, (err, result) => {
//     if (err) throw err;
//     console.log('Passwords match:', result); // Should log true if they match
// });




// const bcrypt = require('bcrypt');
// const testPassword = 'EAPBiango@301';
// const salt = bcrypt.genSaltSync(10);
// const hashedPassword = bcrypt.hashSync(testPassword, salt);

// bcrypt.compare(testPassword, hashedPassword, (err, result) => {
//     if (err) throw err;
//     console.log('Passwords match:', result); // Should log true if they match
// });


// const bcrypt = require('bcrypt');
// const testPassword = 'EAPBiango@301';
// const storedHash = '$2b$10$dwAl.g1upC8EYYJvv.0AhuD9l2jLmG9KSRGpsB5oUVYsbdMaT1tvW'; // The stored hash

// bcrypt.compare(testPassword, storedHash, (err, result) => {
//     if (err) throw err;
//     console.log('Passwords match:', result); // Should log true if they match
// });


const bcrypt = require('bcrypt');

// const testPassword = 'EAPBiango@301';
// const storedHash = '$2b$10$dwAl.g1upC8EYYJvv.0AhuD9l2jLmG9KSRGpsB5oUVYsbdMaT1tvW'.slice(0, 29); // Extract the salt from the hash

// const newHash = bcrypt.hashSync(testPassword, storedHash);
// console.log('Newly hashed password:', newHash);
// console.log('Match:', newHash === storedHash); // Compare if it produces the same hash

// Check bcrypt version
console.log("Bcrypt version: ", bcrypt.version);
