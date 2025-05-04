// Theme selection functionality
const themeOptions = document.querySelectorAll('.theme-option');
const mainContent = document.querySelector('.main-content');
const themePalette = document.querySelector('.theme-palette');
const themesOption = document.querySelector('.themes-option');
const mainDotsDropdown = document.querySelector('.main-dots-dropdown-list');
const mainDropdown = document.querySelector('.main-dropdown');
const mainDropdownList = document.querySelector('.main-dropdown-list');
const mainVerticalDots = document.querySelector('.main-vertical-dots');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbar = document.querySelector('.navbar');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'theme-overlay';
overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 0;
    pointer-events: none;
    border-radius: 1.5rem 1.5rem 0.75rem 0;
`;
mainContent.appendChild(overlay);

// Navbar toggle handler
navbarToggle.addEventListener('click', function() {
        navbar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

// Dropdown menu handlers
mainDropdown.addEventListener('click', function() {
    mainDropdownList.hidden = !mainDropdownList.hidden;
    mainDotsDropdown.hidden = true;
    themePalette.hidden = true;
});

mainVerticalDots.addEventListener('click', function() {
    mainDotsDropdown.hidden = !mainDotsDropdown.hidden;
    mainDropdownList.hidden = true;
    themePalette.hidden = true;
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    if (!mainDropdown.contains(event.target) && !mainDropdownList.contains(event.target)) {
        mainDropdownList.hidden = true;
    }
    if (!mainVerticalDots.contains(event.target) && !mainDotsDropdown.contains(event.target)) {
        mainDotsDropdown.hidden = true;
    }
    if (!themePalette.contains(event.target) && !themesOption.contains(event.target) && !event.target.closest('.themes-option')) {
        themePalette.hidden = true;
    }
});

// Theme selection handlers
themeOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Check if this is the crossed circle option (last option)
        if (this === themeOptions[themeOptions.length - 1]) {
            // For crossed circle, set default background
            mainContent.style.background = 'none';
            mainContent.style.backgroundColor = '#212121';
        } else {
            // For image themes, get the selected theme image path
            const themeImage = this.querySelector('img').src;
            mainContent.style.background = `url('${themeImage}') center/cover no-repeat`;
        }
        
        // Hide the theme palette
        themePalette.hidden = true;
    });
});

// Theme palette toggle handler
themesOption.addEventListener('click', function() {
    // Only toggle the theme palette, don't affect other dropdowns
    themePalette.hidden = !themePalette.hidden;
});

// Handle textarea input and button conversion
const textarea = document.querySelector('.main-chat-textarea');
const audioWaveBtn = document.querySelector('.audio-wave-btn');

    textarea.addEventListener('input', function() {
        if (this.value.trim() !== '') {
        // Convert to send button
        audioWaveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        audioWaveBtn.setAttribute('aria-label', 'Send message');
        } else {
        // Convert back to audio wave button
        audioWaveBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H6L9 3L15 21L18 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        audioWaveBtn.setAttribute('aria-label', 'Audio Wave');
    }
});