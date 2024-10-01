document.addEventListener('DOMContentLoaded', function() {
    // Handle Edit Button Click
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = this.dataset.id;
            const row = document.getElementById(`expense-${expenseId}`);
            row.classList.add('editing');
            
            // Turn the row into editable fields
            row.querySelectorAll('.editable').forEach(cell => {
                const field = cell.dataset.field;
                const value = cell.innerText.trim();
                cell.innerHTML = `<input type="text" value="${value}" />`;
            });
            
            toggleButtons(expenseId, 'edit');
        });
    });

    // Handle Cancel Button Click
    document.querySelectorAll('.cancel-button').forEach(button => {
        button.addEventListener('click', function() {
            const expenseId = this.dataset.id;
            const row = document.getElementById(`expense-${expenseId}`);
            row.classList.remove('editing');
            
            // Restore the original values
            row.querySelectorAll('.editable').forEach(cell => {
                const input = cell.querySelector('input');
                if (input) {
                    cell.innerText = input.value; // Revert to original value
                }
            });
            
            toggleButtons(expenseId, 'cancel');
        });
    });

    // Handle Save Button Click
    document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', async function() {
            const expenseId = this.dataset.id;
            const row = document.getElementById(`expense-${expenseId}`);
            const updatedFields = {};

            // Collect updated data
            row.querySelectorAll('.editable').forEach(cell => {
                const field = cell.dataset.field;
                const input = cell.querySelector('input');
                updatedFields[field] = input ? input.value : cell.innerText;
            });

            // Send updated data to the server using Fetch API
            const response = await fetch(`/expenses/${expenseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields)
            });

            if (response.ok) {
                const data = await response.json();
                row.classList.remove('editing');

                // Update the row with new values
                row.querySelectorAll('.editable').forEach(cell => {
                    const field = cell.dataset.field;
                    cell.innerHTML = field === 'amount' ? `Le${data.expense[field]}` : data.expense[field];
                });
                toggleButtons(expenseId, 'save');
            }
        });
    });

    // Handle Delete Button Click
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async function() {
            const expenseId = this.dataset.id;
            if (confirm('Are you sure you want to delete this expense?')) {
                const response = await fetch(`/expenses/${expenseId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    document.getElementById(`expense-${expenseId}`).remove();
                }
            }
        });
    });

    // Helper function to toggle button visibility
    function toggleButtons(expenseId, action) {
        const editButton = document.querySelector(`.edit-button[data-id="${expenseId}"]`);
        const deleteButton = document.querySelector(`.delete-button[data-id="${expenseId}"]`);
        const saveButton = document.querySelector(`.save-button[data-id="${expenseId}"]`);
        const cancelButton = document.querySelector(`.cancel-button[data-id="${expenseId}"]`);

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


