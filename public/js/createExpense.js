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
