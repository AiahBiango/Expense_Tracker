 // public/js/updateExpense.js
document.addEventListener('DOMContentLoaded', function() {
    // Handle Edit Button Click
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = this.dataset.id; // Use dataset to get the expense ID
            const row = document.getElementById(`expense-${expenseId}`);
            row.classList.add('editing'); // Add editing class to highlight the row
            
            // Turn the row into editable fields
            row.querySelectorAll('.editable').forEach(cell => {
                const field = cell.dataset.field; // Get field name from data attribute
                const value = cell.innerText.trim(); // Get current value from the cell

                // Check if the field is a date
                if (field === 'date') {
                    cell.innerHTML = `<input type="date" value="${value}" style="display: inline;" />`; // Replace with date input
                } else {
                    cell.innerHTML = `<input type="text" value="${value}" />`; // Replace with text input
                }
            });
            
            toggleButtons(expenseId, 'edit'); // Update button visibility
        });
    });

    // Handle Cancel Button Click
    document.querySelectorAll('.cancel-button').forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = this.dataset.id;
            const row = document.getElementById(`expense-${expenseId}`);
            row.classList.remove('editing'); // Remove editing class
            
            // Restore the original values
            row.querySelectorAll('.editable').forEach(cell => {
                const input = cell.querySelector('input');
                if (input) {
                    const originalValue = input.value; // Preserve the input value
                    cell.innerHTML = `<span>${originalValue}</span>`; // Restore span
                }
            });
            
            toggleButtons(expenseId, 'cancel'); // Update button visibility
        });
    });

    // Handle Save Button Click
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', async function() {
            const expenseId = this.dataset.id; // Get expense ID
            const row = document.getElementById(`expense-${expenseId}`);
            const updatedFields = {}; // Object to store updated data

            // Collect updated data from input fields
            row.querySelectorAll('.editable').forEach(cell => {
                const field = cell.dataset.field; // Get field name from data attribute
                const input = cell.querySelector('input');
                updatedFields[field] = input ? input.value : cell.innerText; // Get value from input
            });

            // Send updated data to the server using Fetch API
            const response = await fetch(`/expenses/${expenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields) // Send updated data
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                row.classList.remove('editing'); // Remove editing class

                // Update the row with new values from server response
                row.querySelectorAll('.editable').forEach(cell => {
                    const field = cell.dataset.field; // Get field name again
                    cell.innerHTML = `<span>${data.expense[field]}</span>`; // Update span with new value
                });

                toggleButtons(expenseId, 'save'); // Update button visibility
            } else {
                alert('Failed to save changes.'); // Handle errors
            }
        });
    });

    // Helper function to toggle button visibility
    function toggleButtons(expenseId, action) {
        const editButton = document.querySelector(`.edit-button[data-id="${expenseId}"]`);
        const deleteButton = document.querySelector(`.delete-button[data-id="${expenseId}"]`);
        const saveButton = document.querySelector(`.save-button[data-id="${expenseId}"]`);
        const cancelButton = document.querySelector(`.cancel-button[data-id="${expenseId}"]`);

        // Toggle button visibility based on action
        if (action === 'edit') {
            editButton.style.display = 'none';
            deleteButton.style.display = 'none';
            saveButton.style.display = 'inline';
            cancelButton.style.display = 'inline';
        } else {
            editButton.style.display = 'inline';
            deleteButton.style.display = 'inline';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
        }
    }
});





// // public/js/updateExpense.js

// document.addEventListener('DOMContentLoaded', function() {
//     // Handle Edit Button Click
//     document.querySelectorAll('.edit-button').forEach(button => {
//         button.addEventListener('click', function() {
//             const expenseId = this.dataset.id;
//             const row = document.getElementById(`expense-${expenseId}`);
//             row.classList.add('editing');
            
//             // Turn the row into editable fields
//             row.querySelectorAll('.editable').forEach(cell => {
//                 const field = cell.dataset.field;
//                 const value = cell.innerText.trim();
//                 cell.innerHTML = `<input type="text" value="${value}" />`;
//             });
            
//             toggleButtons(expenseId, 'edit');
//         });
//     });

//     // Handle Cancel Button Click
//     document.querySelectorAll('.cancel-button').forEach(button => {
//         button.addEventListener('click', function() {
//             const expenseId = this.dataset.id;
//             const row = document.getElementById(`expense-${expenseId}`);
//             row.classList.remove('editing');
            
//             // Restore the original values
//             row.querySelectorAll('.editable').forEach(cell => {
//                 const input = cell.querySelector('input');
//                 if (input) {
//                     cell.innerText = input.value; // Revert to original value
//                 }
//             });
            
//             toggleButtons(expenseId, 'cancel');
//         });
//     });

//     // Handle Save Button Click
//     document.querySelectorAll('.save-button').forEach(button => {
//         button.addEventListener('click', async function() {
//             const expenseId = this.dataset.id;
//             const row = document.getElementById(`expense-${expenseId}`);
//             const updatedFields = {};

//             // Collect updated data
//             row.querySelectorAll('.editable').forEach(cell => {
//                 const field = cell.dataset.field;
//                 const input = cell.querySelector('input');
//                 updatedFields[field] = input ? input.value : cell.innerText;
//             });

//             // Send updated data to the server using Fetch API
//             const response = await fetch(`/expenses/${expenseId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedFields)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 row.classList.remove('editing');

//                 // Update the row with new values
//                 row.querySelectorAll('.editable').forEach(cell => {
//                     const field = cell.dataset.field;
//                     cell.innerHTML = field === 'amount' ? `Le${data.expense[field]}` : data.expense[field];
//                 });
//                 toggleButtons(expenseId, 'save');
//             }
//         });
//     });

//     // Helper function to toggle button visibility
//     function toggleButtons(expenseId, action) {
//         const editButton = document.querySelector(`.edit-button[data-id="${expenseId}"]`);
//         const deleteButton = document.querySelector(`.delete-button[data-id="${expenseId}"]`);
//         const saveButton = document.querySelector(`.save-button[data-id="${expenseId}"]`);
//         const cancelButton = document.querySelector(`.cancel-button[data-id="${expenseId}"]`);

//         if (action === 'edit') {
//             editButton.style.display = 'none';
//             deleteButton.style.display = 'none';
//             saveButton.style.display = 'inline';
//             cancelButton.style.display = 'inline';
//         } else {
//             editButton.style.display = 'inline';
//             deleteButton.style.display = 'inline';
//             saveButton.style.display = 'none';
//             cancelButton.style.display = 'none';
//         }
//     }
// });
