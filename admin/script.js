// Code for sidebar feature

// Get the elements
const sidePanel = document.getElementById('sidePanel');
const mainContent = document.getElementById('mainContent');
const sidePanelImg = document.getElementById('SidePanelImg'); // Open button (img)
const closeBtn = document.getElementById('closeBtn');

// Open the side panel
sidePanelImg.addEventListener('click', () => {
    sidePanel.classList.add('open');
    mainContent.classList.add('main-content-pushed'); // Change the width of main content
    sidePanelImg.classList.add('hidden'); // Hide the sidebar image
    setTimeout(() => {
        sidePanelImg.classList.add('disabled'); // Disables interaction with the sidebar image
    }, 500);
});

// Close the side panel
closeBtn.addEventListener('click', () => {
    sidePanel.classList.remove('open');
    mainContent.classList.remove('main-content-pushed'); // Reset the width of main content
    sidePanelImg.classList.remove('hidden', 'disabled'); // Show the sidebar image again
});

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');

    // Load saved buildings from localStorage
    loadSavedBuildings();

    // Event delegation for the 'New Alarm' button
    document.getElementById('NewAlarmButton').addEventListener('click', function() {
        const buildingContainer = createBuildingContainer();
        mainContent.insertBefore(buildingContainer, document.querySelector('.new-alarm-container'));
        saveBuildings(); // Save to localStorage after adding a new building
    });

    function createBuildingContainer() {
        const buildingContainer = document.createElement('div');
        buildingContainer.className = 'building-container';

        buildingContainer.innerHTML = `
            <div style="display: flex;">
                <div class="add-floor-container">
                    <h3>Add Floor</h3>
                </div>
                <div class="building-name">
                    <input type="text" class="building-name-input" placeholder="Building name">
                </div>
                <p class="delete-building-button"> &times;</p>
            </div>
            <div class="floors-container"></div> <!-- Container for floors -->
        `;

        const buildingNameInput = buildingContainer.querySelector('.building-name-input');

        buildingNameInput.addEventListener('input', saveBuildings);
        buildingNameInput.addEventListener('keydown', function(event) {
            if (event.key === ' ') {
                return;
            }
        });

        buildingContainer.querySelector('.delete-building-button').addEventListener('click', function() {
            buildingContainer.remove();
            saveBuildings();
        });

        buildingContainer.querySelector('.add-floor-container').addEventListener('click', function() {
            addFloor(buildingContainer);
        });

        return buildingContainer;
    }

    function addFloor(buildingContainer) {
        const floorContainer = createFloorContainer("Floor Name");
        buildingContainer.querySelector('.floors-container').appendChild(floorContainer);
        saveBuildings();
    }

    function createFloorContainer(floorName) {
        const floorContainer = document.createElement('div');
        floorContainer.className = 'floor-container';
        floorContainer.innerHTML = `
            <div class="floor-container">
                <img src="edit.png" alt="" class="edit-button">
                <p class="delete-floor-button">&times;</p>
                <details open>
                    <summary class="floors">
                        <h3 class="floor-name">${floorName}</h3>
                    </summary>
                    <div class="floor-division">
                        <div class="add-alarm-container" id="addAlarmButton">
                            <h3>Add Alarm</h3>
                        </div>
                    </div>
                </details>
            </div>
        `;

        floorContainer.querySelector('.delete-floor-button').addEventListener('click', function() {
            floorContainer.remove();
            saveBuildings();
        });

        floorContainer.querySelector('.add-alarm-container').addEventListener('click', function() {
            const alarmContainer = createAlarmContainer();
            floorContainer.querySelector('.floor-division').insertBefore(alarmContainer, floorContainer.querySelector('.add-alarm-container'));
            saveBuildings();
        });

        return floorContainer;
    }

    function createAlarmContainer(alarmData = { status: 'Offline', type: '', time: '', delay: '', location: '' }) {
        const newAlarm = document.createElement('div');
        newAlarm.classList.add('alarm-container');
        
        const statusText = alarmData.status === 'Online' ? 'Online' : 'Offline';
    
        newAlarm.innerHTML = `
            <div class="alarm-header-container">
                <p>Status: ${statusText}</p>
                <div class="alarm-status-off"></div>
                <p class="delete-alarm-button">&times;</p>
            </div>
            <div class="alarm-configuration">
                <input type="text" placeholder="Alarm Type" value="${alarmData.type}">
                <input type="number" placeholder="Time" value="${alarmData.time}">
                <input type="number" placeholder="Delay" value="${alarmData.delay}">
            </div>
            <input type="text" class="alarm-location" placeholder="Location:" value="${alarmData.location}">
            <div style="display: flex; gap: 20px;">
                <h5 id="alarmTime">Time: ${alarmData.time ? alarmData.time + 's' : ''}</h5>
                <h5 id="alarmDelay">Delay: ${alarmData.delay ? alarmData.delay + 's' : ''}</h5>
                <button id="refreshButton">
                    <img src="refresh.png" alt="refresh button" class="refresh-button">
                </button>
            </div>
        `;
    
        // Function to check if all inputs are filled and update status
        function checkInputsAndUpdateStatus() {
            const alarmType = newAlarm.querySelector('.alarm-configuration input:nth-child(1)').value;
            const time = newAlarm.querySelector('.alarm-configuration input:nth-child(2)').value;
            const delay = newAlarm.querySelector('.alarm-configuration input:nth-child(3)').value;
            const location = newAlarm.querySelector('.alarm-location').value;
        
            const statusIndicator = newAlarm.querySelector('.alarm-header-container div');
            const statusText = newAlarm.querySelector('.alarm-header-container p');
            const alarmTimeDisplay = newAlarm.querySelector('#alarmTime');
            const alarmDelayDisplay = newAlarm.querySelector('#alarmDelay');
        
            // Update Time and Delay displays
            alarmTimeDisplay.textContent = `Time: ${time ? time + 's' : ''}`;
            alarmDelayDisplay.textContent = `Delay: ${delay ? delay + 's' : ''}`;
        
            // Check if any fields are filled but not all
            const hasAnyInput = alarmType || time || delay || location;
            const hasAllInputs = alarmType && time && delay && location;
        
            // Remove existing warning image if it exists
            const existingWarning = newAlarm.querySelector('.warning-status');
            if (existingWarning) {
                existingWarning.remove();
            }
        
            if (hasAllInputs) {
                statusIndicator.className = 'alarm-status-on';
                statusText.textContent = 'Status: Online';
            } else if (hasAnyInput) {
                statusIndicator.className = 'alarm-status-incomplete';
                statusText.textContent = 'Status: Incomplete';
                
                // Add warning image
                const warningImg = document.createElement('img');
                warningImg.src = 'warning.png';
                warningImg.alt = 'warning';
                warningImg.className = 'warning-status';
                newAlarm.querySelector('.alarm-header-container').appendChild(warningImg);
            } else {
                statusIndicator.className = 'alarm-status-off';
                statusText.textContent = 'Status: Offline';
            }
            
            saveBuildings(); // Save the changes
        }
    
        // Add input event listeners to all inputs
        const inputs = newAlarm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                checkInputsAndUpdateStatus();
                saveBuildings();
            });
        });
    
        newAlarm.querySelector('.delete-alarm-button').addEventListener('click', function() {
            newAlarm.remove();
            saveBuildings();
        });
    
        // Check initial status based on provided data
        setTimeout(checkInputsAndUpdateStatus, 0);
    
        return newAlarm;
    }

   function saveBuildings() {
    const buildings = [];
    const buildingContainers = document.querySelectorAll('.building-container');

    buildingContainers.forEach(container => {
        const buildingName = container.querySelector('.building-name-input').value;
        const floorsContainer = container.querySelector('.floors-container');
        const floors = Array.from(floorsContainer.children).map(floor => {
            const floorName = floor.querySelector('.floor-name').textContent;
            const alarms = Array.from(floor.querySelectorAll('.alarm-container')).map(alarm => {
                return {
                    status: alarm.querySelector('.alarm-header-container p').textContent,
                    type: alarm.querySelector('.alarm-configuration input:nth-child(1)').value,
                    time: alarm.querySelector('.alarm-configuration input:nth-child(2)').value,
                    delay: alarm.querySelector('.alarm-configuration input:nth-child(3)').value,
                    location: alarm.querySelector('.alarm-location').value
                };
            });
            return { floorName, alarms };
        });

        buildings.push({ buildingName, floors });
    });

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser  = users.find(user => user.isLoggedIn); // Get the current logged-in user

    if (currentUser ) {
        // Save buildings data to the current user's object
        currentUser .buildings = buildings; // Update the user's buildings
        localStorage.setItem('users', JSON.stringify(users)); // Save updated users back to localStorage
    }
}

function loadSavedBuildings() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser  = users.find(user => user.isLoggedIn); // Get the current logged-in user

    if (currentUser  && currentUser .buildings) {
        currentUser .buildings.forEach(building => {
            const buildingContainer = createBuildingContainer();
            buildingContainer.querySelector('.building-name-input').value = building.buildingName;

            building.floors.forEach(floor => {
                const floorContainer = createFloorContainer(floor.floorName);
                floor.alarms.forEach(alarm => {
                    const alarmContainer = createAlarmContainer(alarm);
                    floorContainer.querySelector('.floor-division').insertBefore(alarmContainer, floorContainer.querySelector('.add-alarm-container'));
                });

                buildingContainer.querySelector('.floors-container').appendChild(floorContainer);
            });

            mainContent.insertBefore(buildingContainer, document.querySelector('.new-alarm-container'));
        });
    }
}
    // Event delegation for handling clicks on edit buttons
    mainContent.addEventListener('click', function(event) {
        // Handle edit button click
        if (event.target.classList.contains('edit-button')) {
            const editButton = event.target;
            const floorNameElement = editButton.closest('div').querySelector('.floor-name');

            // Create an input field with the current floor name
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = floorNameElement.textContent; // Set the current floor name
            inputField.className = 'floor-name-input'; // Add a class for styling if needed

            // Replace the h3 element with the input field
            floorNameElement.replaceWith(inputField);
            inputField.focus();

            // Handle enter key to save the new name
            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const newFloorName = inputField.value.trim();
                    const newFloorNameElement = document.createElement('h3');
                    newFloorNameElement.className = 'floor-name'; // Restore the class
                    newFloorNameElement.textContent = newFloorName || "Floor Name"; // Default if empty
                    inputField.replaceWith(newFloorNameElement);
                    saveBuildings(); // Save to localStorage after editing the floor name
                }
            });

            // Handle losing focus (optional)
            inputField.addEventListener('blur', function() {
                const newFloorName = inputField.value.trim();
                const newFloorNameElement = document.createElement('h3');
                newFloorNameElement.className = 'floor-name'; // Restore the class
                newFloorNameElement.textContent = newFloorName || "Floor Name"; // Default if empty
                inputField.replaceWith(newFloorNameElement);
                saveBuildings(); // Save to localStorage after editing the floor name
            });
        }

        // Prevent details toggle when clicking on the edit button
        if (event.target.closest('.floors')) {
            const inputField = document.querySelector('.floor-name-input');
            if (inputField) {
                event.preventDefault(); // Prevent toggle if focused on the input field
            }
        }
    });

   // Allow spaces in all input fields, prevent only for non-input elements
    mainContent.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            // Allow space if the target is any input field
            if (event.target.tagName.toLowerCase() === 'input') {
                return; // Allow space to be entered in any input field
            } else {
                // Prevent space from toggling details if not focused on an input
                event.preventDefault();
            }
        }
    });
});

// code for deleting an alarm

// Add event delegation for delete buttons
mainContent.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-alarm-button')) {
        // Get the alarm container element
        const alarmContainer = e.target.closest('.alarm-header-container').parentNode;
        
        // Remove the alarm container from the DOM
        if (alarmContainer) {
            alarmContainer.remove();
        }
    }
});

// code for deleting a building 

// Add event delegation for delete buttons
mainContent.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-building-button')) {
        // Get the building container element
        const buildingContainer = e.target.closest('.building-container');
        
        // Remove the building container from the DOM
        if (buildingContainer) {
            buildingContainer.remove();
        }
    }
});

// code for deleting a floor

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');

    // Event delegation for handling clicks on delete floor buttons
    mainContent.addEventListener('click', function(event) {
        // Check if the clicked element is a delete floor button
        if (event.target.classList.contains('delete-floor-button')) {
            const deleteButton = event.target;
            
            // Find the closest div that wraps the edit button, delete button, and details (the floor container)
            const floorContainer = deleteButton.closest('div');
            
            if (floorContainer) {
                // Remove the entire floor container
                floorContainer.remove();
            }
        }
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const userSettingsButton = document.getElementById('userSettingsButton');
    const userSettingsPanel = document.getElementById('userSettings');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const accountControls = document.getElementById('accountControls');

    // Retrieve current user's data from users array in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.isLoggedIn);

    // Clear existing controls
    accountControls.innerHTML = '';

    if (currentUser) {
        // Logged in user - show delete account and logout buttons
        usernameDisplay.textContent = currentUser.username;
        
        const deleteButton = document.createElement('button');
        deleteButton.id = 'deleteAccountButton';
        deleteButton.textContent = 'Delete Account';
        
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logoutButton';
        logoutButton.textContent = 'Log Out';

        accountControls.appendChild(deleteButton);
        accountControls.appendChild(logoutButton);

        // Handle delete account
        deleteButton.addEventListener('click', () => {
            if (confirm('ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT? THIS ACTION CANNOT BE UNDONE.')) {
                const updatedUsers = users.filter(user => user.username !== currentUser.username);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                alert('Account deleted.');
                window.location.href = '../login/login.html';
            }
        });

        // Handle logout
        logoutButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                currentUser.isLoggedIn = false;
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = '../login/login.html';
            }
        });
    } else {
        // Guest user - show exit guest mode button
        usernameDisplay.textContent = 'Guest account';
        
        const exitGuestButton = document.createElement('button');
        exitGuestButton.id = 'exitGuestButton';
        exitGuestButton.textContent = 'Exit Guest Mode';
        
        accountControls.appendChild(exitGuestButton);

        // Handle exit guest mode
        exitGuestButton.addEventListener('click', () => {
                window.location.href = '../login/login.html';
        });
    }

    // Toggle panel visibility on button click
    userSettingsButton.addEventListener('click', (event) => {
        const buttonRect = userSettingsButton.getBoundingClientRect();

        userSettingsPanel.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
        userSettingsPanel.style.left = `${buttonRect.left + window.scrollX}px`;

        userSettingsPanel.classList.toggle('visible');
        userSettingsPanel.classList.toggle('hidden');

        if (userSettingsPanel.classList.contains('visible')) {
            userSettingsPanel.style.pointerEvents = 'auto';
        } else {
            setTimeout(() => {
                userSettingsPanel.style.pointerEvents = 'none';
            }, 300);
        }
    });

    // Close panel when clicking outside
    document.addEventListener('click', (event) => {
        if (!userSettingsPanel.contains(event.target) && event.target !== userSettingsButton) {
            userSettingsPanel.classList.remove('visible');
            userSettingsPanel.classList.add('hidden');
            setTimeout(() => {
                userSettingsPanel.style.pointerEvents = 'none';
            }, 300);
        }
    });
});