// Products Data
const productsData = [
    {
        id: 1,
        name: "Classic Marble Floor Tile",
        category: "floor",
        size: "600x600",
        price: 85,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Polished",
        description: "Elegant marble finish floor tile perfect for living rooms and hallways. Features a sophisticated pattern with excellent durability.",
        popular: true
    },
    {
        id: 2,
        name: "Modern Wall Tile Collection",
        category: "wall",
        size: "300x600",
        price: 65,
        image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Matt",
        description: "Contemporary wall tiles with a clean, modern aesthetic. Ideal for bathrooms and kitchen backsplashes.",
        popular: false
    },
    {
        id: 3,
        name: "Outdoor Porcelain Tile",
        category: "outdoor",
        size: "800x800",
        price: 120,
        image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Anti-slip",
        description: "Weather-resistant outdoor tiles perfect for patios, balconies, and garden pathways. Anti-slip surface for safety.",
        popular: true
    },
    {
        id: 4,
        name: "3D Geometric Pattern Tile",
        category: "3d",
        size: "400x400",
        price: 95,
        image: "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Textured",
        description: "Stunning 3D geometric patterns that add depth and visual interest to any space. Perfect for feature walls.",
        popular: false
    },
    {
        id: 5,
        name: "Luxury Marble Effect Tile",
        category: "marble",
        size: "600x600",
        price: 110,
        image: "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Polished",
        description: "Premium marble effect tiles that replicate the beauty of natural marble at a fraction of the cost.",
        popular: true
    },
    {
        id: 6,
        name: "Mosaic Art Tile Set",
        category: "mosaic",
        size: "300x300",
        price: 75,
        image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Glossy",
        description: "Artistic mosaic tiles perfect for creating stunning feature walls and decorative accents.",
        popular: false
    },
    {
        id: 7,
        name: "Wood Effect Floor Tile",
        category: "floor",
        size: "600x1200",
        price: 90,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Textured",
        description: "Realistic wood effect tiles that combine the warmth of wood with the durability of ceramic.",
        popular: true
    },
    {
        id: 8,
        name: "Subway Wall Tile",
        category: "wall",
        size: "300x600",
        price: 55,
        image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Matt",
        description: "Classic subway tiles perfect for traditional and contemporary bathroom designs.",
        popular: false
    },
    {
        id: 9,
        name: "Stone Effect Outdoor Tile",
        category: "outdoor",
        size: "600x600",
        price: 100,
        image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Natural",
        description: "Natural stone effect tiles designed for outdoor use with excellent weather resistance.",
        popular: false
    },
    {
        id: 10,
        name: "Abstract 3D Wall Tile",
        category: "3d",
        size: "400x400",
        price: 85,
        image: "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Textured",
        description: "Abstract 3D wall tiles that create stunning visual effects and modern aesthetics.",
        popular: true
    },
    {
        id: 11,
        name: "Carrara Marble Look Tile",
        category: "marble",
        size: "800x800",
        price: 130,
        image: "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Polished",
        description: "Carrara marble look tiles with elegant veining patterns for luxury interiors.",
        popular: true
    },
    {
        id: 12,
        name: "Glass Mosaic Tile",
        category: "mosaic",
        size: "300x300",
        price: 80,
        image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=600",
        finish: "Glossy",
        description: "Beautiful glass mosaic tiles that add sparkle and elegance to any space.",
        popular: false
    }
];

// Global Variables
let currentProducts = [...productsData];
let filteredProducts = [...productsData];
let currentPage = 1;
const productsPerPage = 8;
let isLoading = false;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sizeFilter = document.getElementById('sizeFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const productsContainer = document.getElementById('productsContainer');
const resultsCount = document.getElementById('resultsCount');
const totalCount = document.getElementById('totalCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const activeFilters = document.getElementById('activeFilters');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    setupEventListeners();
    updateResultsCount();
});

// Initialize products display
function initializeProducts() {
    displayProducts(filteredProducts.slice(0, productsPerPage));
    updateResultsCount();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    categoryFilter.addEventListener('change', handleFilters);
    sizeFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    sortFilter.addEventListener('change', handleSort);
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', loadMoreProducts);
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...currentProducts];
    } else {
        filteredProducts = currentProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    displayProducts(filteredProducts.slice(0, productsPerPage));
    updateResultsCount();
    updateActiveFilters();
}

// Handle filters
function handleFilters() {
    const category = categoryFilter.value;
    const size = sizeFilter.value;
    const price = priceFilter.value;
    
    filteredProducts = currentProducts.filter(product => {
        const categoryMatch = !category || product.category === category;
        const sizeMatch = !size || product.size === size;
        const priceMatch = !price || checkPriceRange(product.price, price);
        
        return categoryMatch && sizeMatch && priceMatch;
    });
    
    currentPage = 1;
    displayProducts(filteredProducts.slice(0, productsPerPage));
    updateResultsCount();
    updateActiveFilters();
}

// Check price range
function checkPriceRange(productPrice, priceRange) {
    switch(priceRange) {
        case '0-50':
            return productPrice <= 50;
        case '50-100':
            return productPrice > 50 && productPrice <= 100;
        case '100-200':
            return productPrice > 100 && productPrice <= 200;
        case '200+':
            return productPrice > 200;
        default:
            return true;
    }
}

// Handle sorting
function handleSort() {
    const sortBy = sortFilter.value;
    
    filteredProducts.sort((a, b) => {
        switch(sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'popular':
                return b.popular - a.popular;
            default:
                return 0;
        }
    });
    
    currentPage = 1;
    displayProducts(filteredProducts.slice(0, productsPerPage));
    updateActiveFilters();
}

// Display products
function displayProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12">
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <button class="btn btn-primary" onclick="clearAllFilters()">Clear All Filters</button>
                </div>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    const productsHTML = products.map(product => createProductCard(product)).join('');
    
    if (currentPage === 1) {
        productsContainer.innerHTML = productsHTML;
    } else {
        productsContainer.insertAdjacentHTML('beforeend', productsHTML);
    }
    
    // Show/hide load more button
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    loadMoreBtn.style.display = currentPage < totalPages ? 'inline-block' : 'none';
}

// Create product card HTML
function createProductCard(product) {
    const searchTerm = searchInput.value.toLowerCase();
    const highlightedName = highlightSearchTerm(product.name, searchTerm);
    
    return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.popular ? '<span class="product-badge">Popular</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${highlightedName}</h3>
                    <p class="product-category">${getCategoryDisplayName(product.category)}</p>
                    <div class="product-price">₹${product.price}/sq ft</div>
                    <div class="product-size">${product.size} mm</div>
                    <div class="product-actions">
                        <button class="btn-quick-view" onclick="openProductModal(${product.id})">
                            <i class="fas fa-eye me-1"></i>Quick View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Highlight search terms
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'floor': 'Floor Tiles',
        'wall': 'Wall Tiles',
        'outdoor': 'Outdoor Tiles',
        '3d': '3D Designer',
        'marble': 'Marble Finish',
        'mosaic': 'Mosaic Collection'
    };
    return categoryNames[category] || category;
}

// Load more products
function loadMoreProducts() {
    if (isLoading) return;
    
    isLoading = true;
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
    
    setTimeout(() => {
        currentPage++;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const newProducts = filteredProducts.slice(startIndex, endIndex);
        
        displayProducts(newProducts);
        
        isLoading = false;
        loadMoreBtn.innerHTML = 'Load More Products';
    }, 500);
}

// Update results count
function updateResultsCount() {
    const displayedCount = Math.min(currentPage * productsPerPage, filteredProducts.length);
    resultsCount.textContent = displayedCount;
    totalCount.textContent = filteredProducts.length;
}

// Update active filters
function updateActiveFilters() {
    const filters = [];
    
    if (categoryFilter.value) {
        filters.push({
            type: 'category',
            value: categoryFilter.value,
            label: getCategoryDisplayName(categoryFilter.value)
        });
    }
    
    if (sizeFilter.value) {
        filters.push({
            type: 'size',
            value: sizeFilter.value,
            label: `${sizeFilter.value} mm`
        });
    }
    
    if (priceFilter.value) {
        filters.push({
            type: 'price',
            value: priceFilter.value,
            label: getPriceRangeLabel(priceFilter.value)
        });
    }
    
    displayActiveFilters(filters);
}

// Display active filters
function displayActiveFilters(filters) {
    if (filters.length === 0) {
        activeFilters.innerHTML = '';
        return;
    }
    
    const filtersHTML = filters.map(filter => `
        <span class="filter-tag">
            ${filter.label}
            <button class="remove-filter" onclick="removeFilter('${filter.type}')">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
    
    activeFilters.innerHTML = filtersHTML;
}

// Remove filter
function removeFilter(filterType) {
    switch(filterType) {
        case 'category':
            categoryFilter.value = '';
            break;
        case 'size':
            sizeFilter.value = '';
            break;
        case 'price':
            priceFilter.value = '';
            break;
    }
    
    handleFilters();
}

// Clear all filters
function clearAllFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    sizeFilter.value = '';
    priceFilter.value = '';
    sortFilter.value = 'name';
    
    filteredProducts = [...currentProducts];
    currentPage = 1;
    displayProducts(filteredProducts.slice(0, productsPerPage));
    updateResultsCount();
    updateActiveFilters();
}

// Get price range label
function getPriceRangeLabel(priceRange) {
    const labels = {
        '0-50': 'Under ₹50/sq ft',
        '50-100': '₹50 - ₹100/sq ft',
        '100-200': '₹100 - ₹200/sq ft',
        '200+': 'Above ₹200/sq ft'
    };
    return labels[priceRange] || priceRange;
}

// Open product modal
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalCategory').textContent = getCategoryDisplayName(product.category);
    document.getElementById('modalPrice').textContent = `₹${product.price}`;
    document.getElementById('modalSize').textContent = `${product.size} mm`;
    document.getElementById('modalFinish').textContent = product.finish;
    document.getElementById('modalDescription').textContent = product.description;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Open calculator modal
function openCalculatorModal() {
    // Get the current product from the modal
    const modalName = document.getElementById('modalName').textContent;
    const modalImage = document.getElementById('modalImage').src;
    const modalSize = document.getElementById('modalSize').textContent;
    const modalPrice = document.getElementById('modalPrice').textContent;
    
    // Populate calculator modal with product info
    document.getElementById('calcProductImage').src = modalImage;
    document.getElementById('calcProductName').textContent = modalName;
    document.getElementById('calcProductSize').textContent = modalSize;
    document.getElementById('calcProductPrice').textContent = modalPrice;
    
    // Close product modal and open calculator modal
    const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
    
    setTimeout(() => {
        const calculatorModal = new bootstrap.Modal(document.getElementById('calculatorModal'));
        calculatorModal.show();
    }, 300);
}

// Calculate tiles for specific product
function calculateProductTiles() {
    const length = parseFloat(document.getElementById('calcRoomLength').value);
    const width = parseFloat(document.getElementById('calcRoomWidth').value);
    const calcBtn = document.getElementById('calcCalculateBtn');
    const resultDiv = document.getElementById('calcEstimateResult');
    
    // Get product info
    const productSize = document.getElementById('calcProductSize').textContent;
    const productPrice = parseFloat(document.getElementById('calcProductPrice').textContent.replace('₹', ''));

    // Validate inputs
    if (!length || !width || !productSize) {
        alert('Please fill in all fields');
        return;
    }

    if (length <= 0 || width <= 0) {
        alert('Please enter valid room dimensions');
        return;
    }

    // Show loading state
    calcBtn.classList.add('calculating');
    calcBtn.innerHTML = 'Calculating...';
    calcBtn.disabled = true;

    // Simulate calculation delay
    setTimeout(() => {
        // Calculate room area
        const area = length * width;
        
        // Parse tile dimensions (remove " mm" and convert mm to meters)
        const sizeText = productSize.replace(' mm', ''); // Remove " mm" suffix
        const [tileLengthMm, tileWidthMm] = sizeText.split('x').map(Number);
        
        // Validate tile dimensions
        if (isNaN(tileLengthMm) || isNaN(tileWidthMm)) {
            alert('Invalid tile size format. Please check the product size.');
            calcBtn.classList.remove('calculating');
            calcBtn.innerHTML = '<i class="fas fa-calculator me-2"></i>Calculate Tiles';
            calcBtn.disabled = false;
            return;
        }
        
        const tileLengthM = tileLengthMm / 1000;
        const tileWidthM = tileWidthMm / 1000;
        
        // Calculate tiles needed with precise calculation
        const tilesPerRow = Math.ceil(length / tileLengthM);
        const tilesPerColumn = Math.ceil(width / tileWidthM);
        const tilesNeeded = tilesPerRow * tilesPerColumn;
        
        // Calculate wastage (5% for cutting and breakage)
        const wastage = Math.ceil(tilesNeeded * 0.05);
        const totalTiles = tilesNeeded + wastage;
        
        // Calculate total cost
        const totalCost = totalTiles * productPrice;

        // Update result display with perfect results
        document.getElementById('calcRoomArea').textContent = area.toFixed(2) + ' m²';
        document.getElementById('calcTilesNeeded').textContent = tilesNeeded;
        document.getElementById('calcWastage').textContent = wastage;
        document.getElementById('calcTotalTiles').textContent = totalTiles;
        document.getElementById('calcTotalCost').textContent = '₹' + totalCost.toFixed(2);

        // Show results
        resultDiv.style.display = 'block';

        // Reset button
        calcBtn.classList.remove('calculating');
        calcBtn.innerHTML = '<i class="fas fa-calculator me-2"></i>Calculate Tiles';
        calcBtn.disabled = false;
    }, 1500);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for product cards
function addLoadingAnimation() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize loading animation
setTimeout(addLoadingAnimation, 100); 