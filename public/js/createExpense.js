// public/js/createExpense.js

// Fetch user_id from session and set it in the form when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:8000/user/getUserId', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass token for authentication if needed
            }
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById('user_id').value = data.userId; // Set user_id in the hidden field
        } else {
            document.getElementById('response-msg').textContent = 'Unable to retrieve user information';
        }
    } catch (err) {
        document.getElementById('response-msg').textContent = 'An error occurred while fetching user information';
        console.error('Error:', err);
    }
});

// Handle form submission
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('user_id').value.trim(); // Get user_id from hidden input
    const amount = document.getElementById('amount').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    const date = document.getElementById('date').value.trim();

    // Basic client-side validation
    if (!userId || !amount || !date) {
        document.getElementById('response-msg').textContent = 'User ID, Amount, and Date are required.';
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/expenses/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token for authentication
            },
            body: JSON.stringify({ user_id: userId, amount, description, category, date })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('response-msg').textContent = data.error || 'Failed to create expense';
        } else {
            document.getElementById('response-msg').textContent = 'Expense created successfully';
            // Optionally, clear the form fields
            document.getElementById('expense-form').reset();
        }
    } catch (err) {
        document.getElementById('response-msg').textContent = 'An error occurred. Please try again later.';
        console.error('Error:', err); // Log the error for debugging purposes
    }
});
