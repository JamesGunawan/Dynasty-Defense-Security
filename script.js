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


// Code for 

document.getElementById('NewAlarmButton').addEventListener('click', function() {
    // Create a new building container
    const buildingContainer = document.createElement('div');
    buildingContainer.className = 'building-container';

    // Create the building name div and input
    const buildingName = document.createElement('div');
    buildingName.className = 'building-name';

    const buildingInput = document.createElement('input');
    buildingInput.type = 'text';
    buildingInput.className = 'building-name-input';
    buildingInput.placeholder = 'Building Name';

    // Append the input to the building name div
    buildingName.appendChild(buildingInput);

    // Append the building name div to the building container
    buildingContainer.appendChild(buildingName);

    // Append the new building container to the buildings list
    document.getElementById('BuildingsList').appendChild(buildingContainer);
});