document.addEventListener('DOMContentLoaded', function() {
    // Auto-rotate interval ID

    // Function to start auto-rotation
    function startAutoRotate() {
        // Clear any existing interval to prevent multiple intervals running
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        
        // Set new interval for auto-rotation
        autoRotateInterval = setInterval(() => {
            const tabs = Array.from(document.querySelectorAll('.tab-button'));
            const activeTab = document.querySelector('.tab-button.active');
            let currentIndex = tabs.indexOf(activeTab);
            
            // Move to next tab, or loop back to first if at the end
            const nextIndex = (currentIndex + 1) % tabs.length;
            const nextTabId = tabs[nextIndex].dataset.tab;
            // Don't scroll during auto-rotation
            showTab(nextTabId, false);
        }, ROTATION_INTERVAL);
    }

    // Initialize the categories carousel
    function initCategoriesCarousel() {
        // Get categories data from the HTML
        const categoriesContainer = document.querySelector('.categories-content');
        const categoriesData = [];
        
        // Find all category data elements
        const categoryElements = document.querySelectorAll('.category-data');
        
        // Extract data from HTML elements
        categoryElements.forEach(element => {
            categoriesData.push({
                id: element.dataset.id,
                title: element.dataset.title,
                description: element.dataset.description,
                image: element.dataset.image
            });
        });
        
        if (categoriesData.length === 0) {
            console.warn('No category data found. Please add category data elements to the HTML.');
            return;
        }
        const tabsContainer = document.querySelector('.categories-nav');
        const contentContainer = document.querySelector('.categories-content');
        
        // Create tabs
        categoriesData.forEach((category, index) => {
            // Create tab button
            const tabButton = document.createElement('button');
            tabButton.className = 'tab-button' + (index === 0 ? ' active' : '');
            if (index !== 0) {
                tabButton.style.pointerEvents = 'none';
                tabButton.style.opacity = '0.6';
                tabButton.style.cursor = 'default';
            }
            tabButton.textContent = category.title;
            tabButton.dataset.tab = category.id;
            tabsContainer.appendChild(tabButton);
            
            // Create category card
            const card = document.createElement('div');
            card.className = 'category-card' + (index === 0 ? ' active' : '');
            card.id = `card-${category.id}`;
            card.innerHTML = `
                <div class="card-image">
                    <img src="${category.image}" alt="${category.title}">
                </div>
                <div class="card-content">
                    <h3>${category.title}</h3>
                    <p>${category.description}</p>
                </div>
            `;
            contentContainer.insertBefore(card, contentContainer.firstChild);
        });
        
        // Disable navigation arrows
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        
        if (prevArrow && nextArrow) {
            // Remove any existing click handlers
            prevArrow.replaceWith(prevArrow.cloneNode(true));
            nextArrow.replaceWith(nextArrow.cloneNode(true));
            
            // Style to indicate they're disabled
            prevArrow.style.opacity = '0.5';
            prevArrow.style.cursor = 'not-allowed';
            nextArrow.style.opacity = '0.5';
            nextArrow.style.cursor = 'not-allowed';
            
            // Prevent default behavior
            prevArrow.addEventListener('click', (e) => {
                e.preventDefault();
                // Do nothing - navigation disabled
            });
            
            nextArrow.addEventListener('click', (e) => {
                e.preventDefault();
                // Do nothing - navigation disabled
            });
        }
        
        // Add click event listener only to the first tab
        const firstTab = document.querySelector('.tab-button');
        if (firstTab) {
            firstTab.addEventListener('click', () => {
                const tabId = firstTab.dataset.tab;
                showTab(tabId, true);
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                }
                startAutoRotate();
            });
        }
    }
    
    // Show specific tab
    function showTab(tabId, shouldScroll = true) {
        // Update active tab
        const tabs = document.querySelectorAll('.tab-button');
        const nav = document.querySelector('.categories-nav');
        let activeTab = null;
        
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === tabId;
            tab.classList.toggle('active', isActive);
            if (isActive) {
                activeTab = tab;
            }
        });
        
        // Update active card
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.toggle('active', card.id === `card-${tabId}`);
        });
        
        // Always ensure the active tab is visible and centered
        if (activeTab) {
            // Get current scroll position
            const navScrollLeft = nav.scrollLeft;
            const navWidth = nav.offsetWidth;
            
            // Get tab position relative to nav
            const tabRect = activeTab.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            
            // Calculate the center position of the tab relative to the nav
            const tabCenter = tabRect.left - navRect.left + (tabRect.width / 2);
            
            // Calculate the target scroll position to center the tab
            const targetScroll = navScrollLeft + tabCenter - (navWidth / 2);
            
            // Only scroll if needed (tab is not already centered)
            const currentScrollPos = nav.scrollLeft;
            const scrollThreshold = 5; // pixels
            
            if (Math.abs(currentScrollPos - targetScroll) > scrollThreshold) {
                nav.scrollTo({
                    left: targetScroll,
                    behavior: shouldScroll ? 'smooth' : 'auto'
                });
            }
        }
    }
    
    // Navigate between tabs - disabled as per requirements
    function navigateTabs(direction) {
        // Navigation disabled - do nothing
        return;
    }
    
    // Initialize the carousel when DOM is ready
    if (document.querySelector('.categories-content')) {
        initCategoriesCarousel();
        // Start auto-rotation after initialization
        startAutoRotate();
    }
    
    // Remove hover pause functionality to keep carousel rotating continuously
});
