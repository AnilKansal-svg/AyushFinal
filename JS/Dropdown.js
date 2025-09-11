document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Add click event listeners to each dropdown toggle
    dropdownToggles.forEach(toggle => {
        // Handle click on dropdown toggle
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.dropdown');
            const menu = this.nextElementSibling;
            const isActive = parent.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown !== parent) {
                    dropdown.classList.remove('active');
                    const otherMenu = dropdown.querySelector('.dropdown-menu');
                    if (otherMenu) {
                        otherMenu.style.display = 'none';
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                    }
                }
            });
            
            // Toggle current dropdown
            if (!isActive) {
                parent.classList.add('active');
                menu.style.display = 'block';
                // Trigger reflow
                void menu.offsetWidth;
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateX(-50%) translateY(5px)';
            } else {
                parent.classList.remove('active');
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateX(-50%)';
                // Remove display:block after transition
                setTimeout(() => {
                    if (!parent.classList.contains('active')) {
                        menu.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateX(-50%)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
    
    // Close dropdown when clicking on a dropdown item
    document.querySelectorAll('.dropdown-menu a').forEach(item => {
        item.addEventListener('click', function() {
            const dropdown = this.closest('.dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
                const menu = this.closest('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateX(-50%)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});
