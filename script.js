// Code for sidebar feature


// Get the elements
const sidePanel = document.getElementById('sidePanel');
const mainContent = document.getElementById('mainContent');
const SidePanelImg = document.getElementById('SidePanelImg'); // Open button (img)
const closeBtn = document.getElementById('closeBtn');

// Open the side panel
SidePanelImg.addEventListener('click', () => {
    sidePanel.classList.add('open');
    mainContent.classList.add('main-content-pushed'); // Change the width of main content
    SidePanelImg.classList.add('hidden'); // Hide the sidebar image
    setTimeout(() => {
        SidePanelImg.classList.add('disabled'); // Disables interaction with the sidebar image
    }, 500);
});

// Close the side panel
closeBtn.addEventListener('click', () => {
    sidePanel.classList.remove('open');
    mainContent.classList.remove('main-content-pushed'); // Reset the width of main content
    SidePanelImg.classList.remove('hidden', "disabled"); // Show the sidebar image again
});


// Code for inserting container

document.addEventListener('DOMContentLoaded', function() {
    const newAlarmButton = document.getElementById('NewAlarmButton');
    const mainContent = document.getElementById('mainContent');
    const newAlarmContainer = document.querySelector('.new-alarm-container'); // Target the alarm container to insert before

    newAlarmButton.addEventListener('click', function() {
        // Create a new div for the building container
        const buildingContainer = document.createElement('div');
        buildingContainer.className = 'building-container';

        // Create the structure of the building container
        buildingContainer.innerHTML = `
            <div style="display: flex;">
                <div class="add-floor-container" id="addFloorButton">
                    <h3>Add Floor</h3>
                </div>
                <div class="building-name">
                    <input type="text" class="building-name-input" placeholder="Building name">
                </div>
                <img src="color-picker.png" alt="" class="color-picker">
            </div>
        `;

        // Insert the new building container before the alarm container
        mainContent.insertBefore(buildingContainer, newAlarmContainer);
    });
});



// code for editing the floor

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.building-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const floorNameElement = event.target.nextElementSibling.querySelector('.floor-name');

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = floorNameElement.textContent;
            inputField.className = 'floor-name-input';

            floorNameElement.replaceWith(inputField);

            inputField.focus();

            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const newFloorName = inputField.value.trim();
                    const newFloorNameElement = document.createElement('h3');
                    newFloorNameElement.className = 'floor-name';
                    newFloorNameElement.textContent = newFloorName || "Floor Name";
                    inputField.replaceWith(newFloorNameElement);
                }
            });

            inputField.addEventListener('blur', function() {
                const newFloorName = inputField.value.trim();
                const newFloorNameElement = document.createElement('h3');
                newFloorNameElement.className = 'floor-name';
                newFloorNameElement.textContent = newFloorName || "Floor Name";
                inputField.replaceWith(newFloorNameElement);
            });
        }
    });
});


// code for adding a new floor
document.getElementById('addFloorButton').addEventListener('click', function() {
    const newFloor = document.createElement('div');
    newFloor.innerHTML = `
        <div style="display: flex;">
            <img src="edit.png" alt="" class="edit-button">
            <details>
                <summary class="floors">
                    <h3 class="floor-name">Floor Name</h3>
                </summary>
                <div class="floor-division">
                    <div class="add-alarm-container" id="addAlarmButton">
                        <h3>Add Alarm</h3>
                    </div>
                </div>
            </details>
        </div>
    `;
    document.querySelector('.building-container').appendChild(newFloor);
});

// code for adding a adding a new alarm 

document.addEventListener('click', function(event) {
    // Check if the clicked element is the "Add Alarm" button
    if (event.target && event.target.closest('#addAlarmButton')) {
        const floorDivision = event.target.closest('.floor-division');

        // Create a new alarm block
        const newAlarm = document.createElement('div');
        newAlarm.classList.add('alarm-container'); // Add class
        newAlarm.innerHTML = `
            <div class="alarm-status-container">
                <p>Status: Offline</p>
                <div class="alarm-status-off"></div> <!-- red circle-->
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
