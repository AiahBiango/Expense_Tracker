// public/js/login.js

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailOrUsername = document.getElementById('emailOrUsername').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic client-side validation
    if (!emailOrUsername || !password) {
        document.getElementById('response-msg').textContent = 'All fields are required.';
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailOrUsername, password })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('response-msg').textContent = data.error || 'Login failed';
        } else {
            document.getElementById('response-msg').textContent = 'Login successful';

            // Save the token to local storage
            localStorage.setItem('token', data.token);

            // Redirect to the user profile page
            window.location.href = data.redirectTo;
        }
    } catch (err) {
        document.getElementById('response-msg').textContent = 'An error occurred. Please try again.';
        console.error('Error:', err); // Log the error for debugging purposes
    }
});
