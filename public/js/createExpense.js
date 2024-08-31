// public/js/createExpense.js
document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value.trim();
    const date = document.getElementById('date').value.trim();

    // Basic client-side validation
    if (!amount || !date) {
        document.getElementById('response-msg').textContent = 'Amount and Date are required.';
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/expenses/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Example of sending token for authentication
            },
            body: JSON.stringify({ amount, description, category, date })
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





// document.getElementById('expense-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const userId = document.getElementById('user_id').value.trim();
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
//         const response = await fetch('http://localhost:8000/expenses', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
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






// document.getElementById('expense-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const userId = document.getElementById('user_id').value;
//     const amount = document.getElementById('amount').value;
//     const description = document.getElementById('description').value;
//     const category = document.getElementById('category').value;
//     const date = document.getElementById('date').value;

//     try {
//         const response = await fetch('http://localhost:8000/expenses', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
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
//         document.getElementById('response-msg').textContent = 'An error occurred';
//     }
// });