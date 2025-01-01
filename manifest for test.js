function createNewTab(tabText) {
    // Create a new div element
    const newTab = document.createElement('div');

    // Assign the 'tab' class to the new div
    newTab.className = 'tab';

    // Set the text content of the tab
    newTab.textContent = tabText;

    // Append the new tab to a container (assumes a container with id 'tabContainer' exists)
    const tabContainer = document.getElementById('tabContainer');
    if (tabContainer) {
        tabContainer.appendChild(newTab);
    } else {
        console.error('No tab container found. Ensure there is a container with id "tabContainer" in your HTML.');
    }
}
