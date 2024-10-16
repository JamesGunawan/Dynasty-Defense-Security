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