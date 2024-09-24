// public/js/createExpense.js

// Token and session based implementation
// User Accept header to request JSON data from server
document.addEventListener('DOMContentLoaded', async () => {
    const expenseForm = document.getElementById('expense-form');
    const userIdField = document.getElementById('user_id');
    const responseMsg = document.getElementById('response-msg');
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

    try {
        // Fetch user profile with JSON response expectation
        const response = await fetch("/user/profile", {
            headers: {
                'Accept': 'application/json', // Request JSON response
                'Authorization': token ? `Bearer ${token}` : '' // Include token if available
            }
        });

        // Check if the response is successful and JSON parsing is possible
        if (!response.ok) {
            const errorText = await response.text(); // Retrieve the error response as text for debugging
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
        }

        const userData = await response.json(); // Parse the JSON response
        console.log("User data fetched: ", userData);

        if (userData && userData.id) {
            // Populate the hidden user_id field with the user's ID
            userIdField.value = userData.id;
            console.log("User id set in the form: ", userData.id);
        } else {
            responseMsg.textContent = 'Error: Unable to fetch user data. Please log in.';
            responseMsg.style.color = 'red';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        responseMsg.textContent = `Error: ${error.message}`;
        responseMsg.style.color = 'red';
    }

    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        // Collect form data
        const userId = userIdField.value; // Hidden field value
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        // Basic client-side validation
        if (!userId || !amount || !date) {
            responseMsg.textContent = 'User ID, Amount, and Date are required.';
            responseMsg.style.color = 'red';
            console.log("Validation failed: ", { userId, amount, date });
            return;
        }

        // Create an expense object
        const expenseData = {
            user_id: userId, // Include user ID in the request
            amount: parseFloat(amount),
            description,
            category,
            date
        };
        console.log("Expense data being sent: ", expenseData);

        try {
            // Send a POST request to the server to create a new expense
            const response = await fetch('/expenses/add_expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' // Include token if available
                },
                body: JSON.stringify(expenseData)
            });

            const result = await response.json();
            console.log("Server response: ", result);

            if (response.ok) {
                // Display success message and reset form
                responseMsg.textContent = 'Expense created successfully!';
                responseMsg.style.color = 'green';
                expenseForm.reset();
            } else {
                // Display error message
                responseMsg.textContent = `Error: ${result.error}`;
                responseMsg.style.color = 'red';
            }
        } catch (error) {
            console.error('Error creating expense:', error);
            responseMsg.textContent = 'Failed to create expense. Please try again.';
            responseMsg.style.color = 'red';
        }
    });
});









// // Both token and session based implemantation. This implemenation handles token if available
// // public/js/createExpense.js

// document.addEventListener('DOMContentLoaded', async () => {
//     const expenseForm = document.getElementById('expense-form');
//     const userIdField = document.getElementById('user_id');
//     const responseMsg = document.getElementById('response-msg');
//     const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

//     try {
//         // Attempt to fetch user ID from the server
//         const response = await fetch('/user/profile', {
//             headers: {
//                 'Authorization': token ? `Bearer ${token}` : '' // Include token if available
//             }
//         });

//         const userData = await response.json();
//         // Log user data fetch from ther server
//         console.log("User data fectehed: ", userData);

//         if (response.ok && userData.id) {
//             // Populate the hidden user_id field with the user's ID
//             userIdField.value = userData.id;
//             // Log to see if user_id value is set in the hidden id field
//             console.log("User id set in the form: ", userData.id);
//         } else {
//             // If not authorized, redirect to login or show an error
//             responseMsg.textContent = 'Error: Unable to fetch user data. Please log in.';
//             responseMsg.style.color = 'red';
//         }
//     } catch (error) {
//         console.log('Error fetching user data:', error);
//         responseMsg.textContent = 'Error: Unable to fetch user data.';
//         responseMsg.style.color = 'red';
//     }

//     expenseForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent form from submitting normally

//         // Collect form data
//         const userId = userIdField.value; // Hidden field value
//         const amount = document.getElementById('amount').value;
//         const description = document.getElementById('description').value;
//         const category = document.getElementById('category').value;
//         const date = document.getElementById('date').value;

//         // Basic client-side validation
//         if (!userId || !amount || !date) {
//             responseMsg.textContent = 'User ID, Amount, and Date are required.';
//             responseMsg.style.color = 'red';
//             // Log to see if validation failed
//             console.log("Validation failed: ", {userId, amount, date});
//             return;
//         }

//         // Create an expense object
//         const expenseData = {
//             user_id: userId, // Include user ID in the request
//             amount: parseFloat(amount),
//             description,
//             category,
//             date
//         };
//         // Log the sent expense data
//         console.log("Expense data being sent: ", expenseData);

//         try {
//             // Send a POST request to the server to create a new expense
//             const response = await fetch('/expenses/add_expense', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': token ? `Bearer ${token}` : '' // Include token if available
//                 },
//                 body: JSON.stringify(expenseData)
//             });

//             const result = await response.json();
//             // Log server response
//             console.log("Server response: ", result);

//             if (response.ok) {
//                 // Display success message and reset form
//                 responseMsg.textContent = 'Expense created successfully!';
//                 responseMsg.style.color = 'green';
//                 expenseForm.reset();
//             } else {
//                 // Display error message
//                 responseMsg.textContent = `Error: ${result.error}`;
//                 responseMsg.style.color = 'red';
//             }
//         } catch (error) {
//             // Handle any errors that occur during the request
//             console.error('Error creating expense:', error);
//             responseMsg.textContent = 'Failed to create expense. Please try again.';
//             responseMsg.style.color = 'red';
//         }
//     });
// });



// // Session based implementation
// // public/js/createExpense.js

// document.addEventListener('DOMContentLoaded', async () => {
//     const expenseForm = document.getElementById('expense-form');
//     const userIdField = document.getElementById('user_id');
//     const responseMsg = document.getElementById('response-msg');

//     try {
//         // Fetch the logged-in user's ID from the server
//         const userResponse = await fetch('/user/profile'); 
//         const userData = await userResponse.json();

//         if (userResponse.ok && userData.id) {
//             // Populate the hidden user_id field with the user's ID
//             userIdField.value = userData.id;
//         } else {
//             // If not authorized, redirect to login or show an error
//             responseMsg.textContent = 'Error: Unable to fetch user data. Please log in.';
//             responseMsg.style.color = 'red';
//         }
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         responseMsg.textContent = 'Error: Unable to fetch user data.';
//         responseMsg.style.color = 'red';
//     }

//     expenseForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Prevent form from submitting normally

//         // Collect form data
//         const userId = userIdField.value; // Hidden field value
//         const amount = document.getElementById('amount').value;
//         const description = document.getElementById('description').value;
//         const category = document.getElementById('category').value;
//         const date = document.getElementById('date').value;

//         // Create an expense object
//         const expenseData = {
//             user_id: userId, // Include user ID in the request
//             amount: parseFloat(amount),
//             description,
//             category,
//             date
//         };

//         try {
//             // Send a POST request to the server to create a new expense
//             const response = await fetch('/expenses/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(expenseData)
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 // Display success message and reset form
//                 responseMsg.textContent = 'Expense created successfully!';
//                 responseMsg.style.color = 'green';
//                 expenseForm.reset();
//             } else {
//                 // Display error message
//                 responseMsg.textContent = `Error: ${result.error}`;
//                 responseMsg.style.color = 'red';
//             }
//         } catch (error) {
//             // Handle any errors that occur during the request
//             console.error('Error creating expense:', error);
//             responseMsg.textContent = 'Failed to create expense. Please try again.';
//             responseMsg.style.color = 'red';
//         }
//     });
// });








// // Token based implementation
// // public/js/createExpense.js

// // Fetch user_id from session and set it in the form when the page loads
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('http://localhost:8000/user/getUserId', {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass token for authentication if needed
//             }
//         });
//         const data = await response.json();

//         if (response.ok) {
//             document.getElementById('user_id').value = data.userId; // Set user_id in the hidden field
//         } else {
//             document.getElementById('response-msg').textContent = 'Unable to retrieve user information';
//         }
//     } catch (err) {
//         document.getElementById('response-msg').textContent = 'An error occurred while fetching user information';
//         console.error('Error:', err);
//     }
// });

// // Handle form submission
// document.getElementById('expense-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const userId = document.getElementById('user_id').value.trim(); // Get user_id from hidden input
//     const amount = document.getElementById('amount').value.trim();
//     const description = document.getElementById('description').value.trim();
//     const category = document.getElementById('category').value.trim();
//     const date = document.getElementById('date').value.trim();

//     // Basic client-side validation
//     if (!userId || !amount || !date) {
//         document.getElementById('response-msg').textContent = 'User ID, Amount, and Date are required.';
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:8000/expenses/add_expense', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}` // Token for authentication
//             },
//             body: JSON.stringify({ user_id: userId, amount, description, category, date })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             document.getElementById('response-msg').textContent = data.error || 'Failed to create expense';
//         } else {
//             document.getElementById('response-msg').textContent = 'Expense created successfully';
//             // Optionally, clear the form fields
//             document.getElementById('expense-form').reset();
//         }
//     } catch (err) {
//         document.getElementById('response-msg').textContent = 'An error occurred. Please try again later.';
//         console.error('Error:', err); // Log the error for debugging purposes
//     }
// });
