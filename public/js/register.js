document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const authMsg = document.getElementById('auth-msg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                authMsg.textContent = data.error || 'User already exists!';
            } else {
                authMsg.textContent = 'User created successfully';
                // Optionally, redirect to another page or clear the form
                // window.location.href = '/login.html';
            }

        } catch (err) {
            authMsg.textContent = 'An error occurred';
        }
    });
});
