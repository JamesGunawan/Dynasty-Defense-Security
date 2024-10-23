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

// Code for inserting container and adding a floor
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');

    // Event delegation for the 'New Alarm' button
    document.getElementById('NewAlarmButton').addEventListener('click', function() {
        const buildingContainer = document.createElement('div');
        buildingContainer.className = 'building-container';

        buildingContainer.innerHTML = `
            <div style="display: flex;">
                <div class="add-floor-container" id="addFloorButton">
                    <h3>Add Floor</h3>
                </div>
                <div class="building-name">
                    <input type="text" class="building-name-input" placeholder="Building name">
                </div>
                <p class="delete-building-button"> &times;</p>
            </div>
        `;

        mainContent.insertBefore(buildingContainer, document.querySelector('.new-alarm-container'));
    });

    // Event delegation for 'Add Floor' button
    mainContent.addEventListener('click', function(e) {
        if (e.target && e.target.closest('#addFloorButton')) {
            const newFloor = document.createElement('div');
            newFloor.style.display = 'flex';
            newFloor.innerHTML = `
                <img src="edit.png" alt="" class="edit-button">
                <details open>
                    <summary class="floors">
                        <h3 class="floor-name">Floor Name</h3>
                    </summary>
                    <div class="floor-division">
                        <!-- Add new alarm button -->
                        <div class="add-alarm-container" id="addAlarmButton">
                            <h3>Add Alarm</h3>
                        </div>
                    </div>
                </details>
            `;
            e.target.closest('.building-container').appendChild(newFloor);
        }
    });
});

// Code for handling editing floors while disabling <details> default toggling
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');

    // Event delegation for handling clicks on edit buttons
    mainContent.addEventListener('click', function(event) {
        // Handle edit button click
        if (event.target.classList.contains('edit-button')) {
            const editButton = event.target;
            const floorNameElement = editButton.nextElementSibling.querySelector('.floor-name');

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
                }
            });

            // Handle losing focus (optional)
            inputField.addEventListener('blur', function() {
                const newFloorName = inputField.value.trim();
                const newFloorNameElement = document.createElement('h3');
                newFloorNameElement .className = 'floor-name'; // Restore the class
                newFloorNameElement.textContent = newFloorName || "Floor Name"; // Default if empty
                inputField.replaceWith(newFloorNameElement);
            });
        }

        // Handle New Alarm button click
        if (event.target.id === 'NewAlarmButton') {
            console.log('New Alarm button clicked');
        }

        // Prevent details toggle when clicking on the edit button
        if (event.target.closest('.floors')) {
            if (document.activeElement.classList.contains('floor-name-input')) {
                event.preventDefault(); // Prevent toggle if focused on the input field
            }
        }
    });

    // Prevent default behavior for spacebar when focused on input
    mainContent.addEventListener('keydown', function(event) {
        if (event.key === ' ') {
            // Do not prevent the default action if the input field is focused
            if (document.activeElement.classList.contains('floor-name-input')) {
                // Allow space to be entered in the input field
                return; // Do nothing, let the input field handle it
            } else {
                // Prevent space from toggling details if not focused on the input
                event.preventDefault();
            }
        }
    });
});

// Code for adding an alarm
document.addEventListener('click', function(event) {
    // Check if the clicked element is the "Add Alarm" button
    if (event.target && event.target.closest('#addAlarmButton')) {
        const floorDivision = event.target.closest('.floor-division');

        // Create a new alarm block
        const newAlarm = document.createElement('div');
        newAlarm.classList.add('alarm-container'); // Add class
        newAlarm.innerHTML = `
            <div class="alarm-header-container">
                <p>Status: Offline</p>
                <div class="alarm-status-off"></div> <!-- red circle-->
                <p class="delete-alarm-button"> &times;</p>
            </div>
            <div class="alarm-configuration">
                <input type="text" placeholder="Alarm Type">
                <input type="number" placeholder="Time">
                <input type="number" placeholder="Delay">
            </div>
            <input type="text" class="alarm-location" placeholder="Location:">
            <div style="display: flex; gap: 20px;">
                <h5>Time:</h5>
                <h5>Delay:</h5>
                <button id="refreshButton">
                    <img src="refresh.png" alt="refresh button" class="refresh-button">
                </button>
            </div>
        `;

        // Find the add-alarm-container and insert the new alarm before it
        const addAlarmButton = floorDivision.querySelector('.add-alarm-container');
        floorDivision.insertBefore(newAlarm, addAlarmButton);
    }
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