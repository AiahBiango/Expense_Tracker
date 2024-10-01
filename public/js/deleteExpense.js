// public/js/deleteExpense.js

document.addEventListener('DOMContentLoaded', function() {
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
});
