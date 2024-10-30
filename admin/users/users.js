document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.getElementById('userTableBody');

    // Fetch users from localStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Save users to localStorage
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Check if current user is admin
    function checkAdminAccess() {
        const users = getUsers();
        const currentUser = users.find(user => user.isLoggedIn);
        
        if (!currentUser || !currentUser.isAdmin) {
            alert('Access denied. Admin privileges required.');
            window.location.href = '../login/login.html';
            return false;
        }
        return true;
    }

    // Render user table
    function renderUserTable() {
        if (!checkAdminAccess()) return;

        const users = getUsers();
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td class="${user.isAdmin ? 'admin-status' : 'user-status'}">
                    ${user.isAdmin ? 'Admin' : 'User'}
                </td>
                <td>
                    <button onclick="changeUsername('${user.username}')">Change Username</button>
                    <button onclick="toggleAdminStatus('${user.username}')">${user.isAdmin ? 'Demote' : 'Promote'}</button>
                    <button onclick="deleteUser('${user.username}')">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Change username
    window.changeUsername = function(oldUsername) {
        if (!checkAdminAccess()) return;

        const newUsername = prompt(`Enter new username for ${oldUsername}:`);
        if (newUsername && newUsername.trim()) {
            const users = getUsers();
            
            // Check if username already exists
            if (users.some(u => u.username === newUsername)) {
                alert('Username already exists. Please choose a different one.');
                return;
            }

            const user = users.find(u => u.username === oldUsername);
            if (user) {
                user.username = newUsername.trim();
                saveUsers(users);
                renderUserTable();
                alert('Username updated successfully!');
            }
        }
    }

    // Toggle admin status
    window.toggleAdminStatus = function(username) {
        if (!checkAdminAccess()) return;

        const users = getUsers();
        const currentAdmin = users.find(u => u.isLoggedIn && u.isAdmin);
        const targetUser = users.find(u => u.username === username);

        // Prevent admin from demoting themselves
        if (currentAdmin.username === username) {
            alert('You cannot change your own admin status.');
            return;
        }

        if (targetUser) {
            targetUser.isAdmin = !targetUser.isAdmin;
            saveUsers(users);
            renderUserTable();
            alert(`User ${username} has been ${targetUser.isAdmin ? 'promoted to admin' : 'demoted to user'}`);
        }
    }

    // Delete user
    window.deleteUser = function(username) {
        if (!checkAdminAccess()) return;

        const users = getUsers();
        const currentAdmin = users.find(u => u.isLoggedIn && u.isAdmin);

        // Prevent admin from deleting their own account
        if (currentAdmin.username === username) {
            alert('You cannot delete your own account while logged in.');
            return;
        }

        if (confirm(`Are you sure you want to delete user ${username}? This action cannot be undone.`)) {
            const updatedUsers = users.filter(u => u.username !== username);
            saveUsers(updatedUsers);
            renderUserTable();
            alert(`User ${username} has been deleted.`);
        }
    }

    // Initial render
    renderUserTable();
});