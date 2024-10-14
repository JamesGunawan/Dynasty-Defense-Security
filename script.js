// Toggle the flip box between sign up and sign in
document.getElementById('flipToSignIn').addEventListener('click', () => {
    document.querySelector('.flip-box-inner').classList.add('flipped');
});

document.getElementById('flipToSignUp').addEventListener('click', () => {
    document.querySelector('.flip-box-inner').classList.remove('flipped');
});

// Sign up validation
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Clear previous error messages
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    // Check password requirements
    if (password.length < 16 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        passwordError.textContent = 'Password must be at least 16 characters, include a capital letter, and a special character.';
        passwordError.style.display = 'block';
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username || user.email === email)) {
        passwordError.textContent = 'Username or email already exists.';
        passwordError.style.display = 'block';
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! You can now sign in.');
});

// !2jOn(3idh*b*23f@C

// View registered users in console
function viewRegisteredUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Registered users:', users);
}

// Clear registered users
function clearRegisteredUsers() {
    localStorage.removeItem('users');
    console.log('All users have been cleared.');
}








document.getElementById('alarmForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const time = document.getElementById('timeInput').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const alarmType = document.getElementById('alarmType').value;
    const delay = document.getElementById('delayInput').value;
    const delayUnit = document.getElementById('delayUnit').value;

    // Display the alarm details
    const alarmDetails = `
        <p><strong>Time:</strong> ${time} ${timeUnit}</p>
        <p><strong>Alarm Type:</strong> ${alarmType}</p>
        <p><strong>Delay:</strong> ${delay} ${delayUnit}</p>
    `;
    document.getElementById('alarmDetails').innerHTML = alarmDetails;
});
