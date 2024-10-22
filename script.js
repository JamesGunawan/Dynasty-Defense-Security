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
    const alarmContainer = document.querySelector('.new-alarm-container'); // Target the alarm container to insert before

    newAlarmButton.addEventListener('click', function() {
        // Create a new div for the building container
        const buildingContainer = document.createElement('div');
        buildingContainer.className = 'building-container';

        // Create the building name input
        const buildingName = document.createElement('div');
        buildingName.className = 'building-name';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'building-name-input';
        input.placeholder = 'Building Name';

        buildingName.appendChild(input);
        buildingContainer.appendChild(buildingName);

        // Insert the new building container before the alarm container
        mainContent.insertBefore(buildingContainer, alarmContainer);
    });
});


// code for editing the floor

document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-button'); // Select all edit buttons

    editButtons.forEach(editButton => {
        editButton.addEventListener('click', function() {
            const floorNameElement = this.nextElementSibling.querySelector('.floor-name'); // Get the corresponding h3 element

            // Create an input field with the current floor name
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = floorNameElement.textContent; // Set the current floor name
            inputField.className = 'floor-name-input'; // Add a class for styling if needed

            // Replace the h3 element with the input field
            floorNameElement.replaceWith(inputField);

            // Focus on the input field
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
                newFloorNameElement.className = 'floor-name'; // Restore the class
                newFloorNameElement.textContent = newFloorName || "Floor Name"; // Default if empty
                inputField.replaceWith(newFloorNameElement);
            });
        });
    });

    // Prevent details toggle when clicking on the edit button
    document.querySelectorAll('.floors').forEach(floor => {
        floor.addEventListener('click', function(event) {
            // Prevent toggle if the input field is focused
            if (document.activeElement.classList.contains('floor-name-input')) {
                event.preventDefault(); // Prevent toggle if focused on the input field
            }
        });
    });
});

