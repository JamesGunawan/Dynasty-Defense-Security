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
    const signupSuccess = document.getElementById('signupSuccess');

    // Clear previous error messages
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';
    signupSuccess.style.display = 'none';

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

    // Check if username or email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username || user.email === email)) {
        passwordError.textContent = 'Username or email already exists.';
        passwordError.style.display = 'block';
        return;
    }

    // Save the new user to localStorage
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Clear form fields
    document.getElementById('signupUsername').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirmPassword').value = '';

    // Show success message
    signupSuccess.style.display = 'block';

    // Flip to the sign-in form after a delay
    setTimeout(() => {
        document.querySelector('.flip-box-inner').classList.add('flipped');
        
        // Hides the success message
        signupSuccess.style.display = 'none';
    }, 2000); // 2 second delay
});

// Sign-in validation and redirect to index.html
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const signinUsername = document.getElementById('signinUsername').value.trim();
    const signinEmail = document.getElementById('signinEmail').value.trim();
    const signinPassword = document.getElementById('signinPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists and password matches
    const validUser = users.find(user => 
        user.username === signinUsername && 
        user.email === signinEmail && 
        user.password === signinPassword
    );

    if (validUser) {
        // Redirect to index.html
        window.location.href = 'index.html';
    } else {
        alert('Invalid username, email, or password.');
    }
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
