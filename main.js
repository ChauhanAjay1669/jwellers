// LUXE JEWELS - Main JavaScript File
// Premium Jewelry Shopping App

// Global Variables
let currentUser = null;
let products = [];
let cart = [];
let wishlist = [];

// Sample Product Data
const sampleProducts = [
    {
        id: '1',
        name: 'Eternal Diamond Ring',
        category: 'rings',
        price: 2499,
        originalPrice: 2999,
        images: ['https://kimi-web-img.moonshot.cn/img/www.kingofjewelry.com/a38d530c91a31b83862a5193d0bb654a9f22d985.jpg'],
        description: 'Exquisite diamond ring with 18k gold band, perfect for engagements and special occasions.',
        specifications: {
            material: '18k Gold',
            diamond: '1.2ct',
            size: 'Resizable'
        },
        inStock: true,
        rating: 4.8,
        reviews: 124,
        trending: true
    },
    {
        id: '2',
        name: 'Golden Elegance Necklace',
        category: 'necklaces',
        price: 1899,
        originalPrice: 2299,
        images: ['https://kimi-web-img.moonshot.cn/img/vkdiamonds.com/4756994eabd736019d50bc34609984975b3c8cb8.webp'],
        description: 'Stunning gold necklace with intricate design, featuring premium craftsmanship.',
        specifications: {
            material: '22k Gold',
            weight: '15.5g',
            length: '18 inches'
        },
        inStock: true,
        rating: 4.9,
        reviews: 89,
        trending: true
    },
    {
        id: '3',
        name: 'Luxury Tennis Bracelet',
        category: 'bracelets',
        price: 3299,
        originalPrice: 3899,
        images: ['https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/df2c4819166e178e83cfbb930863f1a1498b2a22.jpg'],
        description: 'Classic tennis bracelet with brilliant diamonds set in premium gold.',
        specifications: {
            material: '18k Gold',
            diamonds: '2.5ct total',
            length: '7 inches'
        },
        inStock: true,
        rating: 4.7,
        reviews: 156,
        trending: false
    },
    {
        id: '4',
        name: 'Diamond Stud Earrings',
        category: 'earrings',
        price: 1599,
        originalPrice: 1899,
        images: ['https://kimi-web-img.moonshot.cn/img/8ae4ebe981419eb9e477-c82b2593bd43ac54398dde0a76fc5603.ssl.cf1.rackcdn.com/f365bf3b33c000af4ae250095c991165deea9f83.jpg'],
        description: 'Timeless diamond stud earrings, perfect for everyday luxury.',
        specifications: {
            material: '14k Gold',
            diamonds: '0.5ct each',
            backing: 'Push back'
        },
        inStock: true,
        rating: 4.6,
        reviews: 203,
        trending: true
    },
    {
        id: '5',
        name: 'Vintage Gold Chain',
        category: 'necklaces',
        price: 2199,
        originalPrice: 2599,
        images: ['https://kimi-web-img.moonshot.cn/img/katebenson.com/c8ebd4f06d71255b46f49ef1c758f3a430635a9b.jpg'],
        description: 'Heavy vintage-inspired gold chain with classic link design.',
        specifications: {
            material: '22k Gold',
            weight: '25g',
            length: '20 inches'
        },
        inStock: true,
        rating: 4.8,
        reviews: 67,
        trending: false
    },
    {
        id: '6',
        name: 'Royal Wedding Band',
        category: 'rings',
        price: 2899,
        originalPrice: 3399,
        images: ['https://kimi-web-img.moonshot.cn/img/sourcebridge.com/6fc1e5922a112c793514a50fa923782a24adf25d.jpg'],
        description: 'Majestic wedding band with intricate engravings and diamond accents.',
        specifications: {
            material: '18k Gold',
            diamonds: '0.8ct',
            width: '6mm'
        },
        inStock: true,
        rating: 4.9,
        reviews: 98,
        trending: true
    },
    {
        id: '7',
        name: 'Elegant Pearl Bracelet',
        category: 'bracelets',
        price: 899,
        originalPrice: 1199,
        images: ['https://kimi-web-img.moonshot.cn/img/www.pinzhidisplay.com/dc17c5d830b3aa3cad6047d34d2a8d9b7d2a941d.jpg'],
        description: 'Sophisticated pearl bracelet with gold clasp, perfect for formal occasions.',
        specifications: {
            material: '18k Gold',
            pearls: 'Akoya pearls',
            length: '7.5 inches'
        },
        inStock: true,
        rating: 4.5,
        reviews: 134,
        trending: false
    },
    {
        id: '8',
        name: 'Designer Chandelier Earrings',
        category: 'earrings',
        price: 1999,
        originalPrice: 2399,
        images: ['https://kimi-web-img.moonshot.cn/img/antdisplay.com/e6c5982db6aa07947600a94c16608af394656b96.jpg'],
        description: 'Dramatic chandelier earrings with cascading diamonds and gold elements.',
        specifications: {
            material: '18k Gold',
            diamonds: '1.5ct total',
            length: '2.5 inches'
        },
        inStock: true,
        rating: 4.7,
        reviews: 76,
        trending: true
    },
    {
        id: '9',
        name: 'Luxury Watch Collection',
        category: 'watches',
        price: 8999,
        originalPrice: 9999,
        images: ['https://kimi-web-img.moonshot.cn/img/dgdisplay.com/ca2a6f25edcd70eee5f139b9d3bfec5dd4bd79cb.jpg'],
        description: 'Swiss-made luxury watch with gold case and diamond hour markers.',
        specifications: {
            material: '18k Gold Case',
            movement: 'Swiss Automatic',
            diamonds: '0.3ct'
        },
        inStock: true,
        rating: 4.9,
        reviews: 45,
        trending: true
    },
    {
        id: '10',
        name: 'Classic Gold Anklet',
        category: 'bracelets',
        price: 599,
        originalPrice: 799,
        images: ['https://kimi-web-img.moonshot.cn/img/img.freepik.com/0c277364ebd10ccaac6a589b7130392af014c4ab.jpg'],
        description: 'Delicate gold anklet with traditional design, perfect for everyday wear.',
        specifications: {
            material: '22k Gold',
            weight: '8g',
            length: '9 inches'
        },
        inStock: true,
        rating: 4.4,
        reviews: 189,
        trending: false
    },
    {
        id: '11',
        name: 'Statement Cocktail Ring',
        category: 'rings',
        price: 3699,
        originalPrice: 4299,
        images: ['https://kimi-web-img.moonshot.cn/img/penbodisplay.com/b2493a206c532468d69101d6f080dc100876720e.jpg'],
        description: 'Bold cocktail ring featuring large gemstone surrounded by diamonds.',
        specifications: {
            material: '18k Gold',
            centerStone: '3ct Emerald',
            diamonds: '1ct accent'
        },
        inStock: true,
        rating: 4.8,
        reviews: 92,
        trending: true
    },
    {
        id: '12',
        name: 'Heart Pendant Necklace',
        category: 'necklaces',
        price: 1399,
        originalPrice: 1699,
        images: ['https://kimi-web-img.moonshot.cn/img/i.pinimg.com/a1c0d4dae622291ffe4998d2ba17148f5bcab189.jpg'],
        description: 'Romantic heart-shaped pendant with diamond accents on gold chain.',
        specifications: {
            material: '14k Gold',
            diamonds: '0.3ct',
            chainLength: '16 inches'
        },
        inStock: true,
        rating: 4.6,
        reviews: 167,
        trending: false
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load data from localStorage
    loadUserData();
    loadProducts();
    loadCart();
    loadWishlist();
    
    // Initialize current page
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
        case 'profile':
            initializeProfilePage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('cart.html')) return 'cart';
    if (path.includes('profile.html')) return 'profile';
    return 'index';
}

// User Authentication
function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserInterface();
    }
}

function updateUserInterface() {
    // Update UI elements based on user login status
    if (currentUser) {
        // User is logged in
        console.log('User logged in:', currentUser.name);
    } else {
        // User is not logged in
        console.log('No user logged in');
    }
}

// Product Management
function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = sampleProducts;
        localStorage.setItem('products', JSON.stringify(products));
    }
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

function filterProducts(category) {
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
}

// Cart Management
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return false;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    showNotification('Added to cart successfully!', 'success');
    return true;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveCart();
    showNotification('Removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Wishlist Management
function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist!', 'success');
    }
    saveWishlist();
    updateWishlistUI();
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

// UI Functions
function displayProducts(productsToShow, containerId = 'products-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card card-hover relative';
    card.innerHTML = `
        <div class="relative">
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-64 object-cover">
            <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <div class="p-6">
            <h3 class="font-display text-xl font-semibold mb-2 text-gray-800">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.description}</p>
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <span class="price-tag">$${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="text-gray-400 line-through text-sm">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="text-sm text-gray-600">${product.rating}</span>
                </div>
            </div>
            <button onclick="addToCart('${product.id}')" class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    const count = getCartItemCount();
    
    if (cartCountEl) {
        if (count > 0) {
            cartCountEl.textContent = count;
            cartCountEl.classList.remove('hidden');
        } else {
            cartCountEl.classList.add('hidden');
        }
    }
}

function updateWishlistUI() {
    // Update all wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (isInWishlist(productId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Page-specific initialization
function initializeHomePage() {
    loadFeaturedProducts();
    initializeTrendingCarousel();
}

function loadFeaturedProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 6); // Show first 6 products
    displayProducts(featuredProducts, 'products-grid');
}

function initializeTrendingCarousel() {
    const trendingList = document.getElementById('trending-list');
    if (!trendingList) return;
    
    const trendingProducts = products.filter(product => product.trending);
    
    trendingProducts.forEach(product => {
        const slide = document.createElement('li');
        slide.className = 'splide__slide';
        slide.innerHTML = `
            <div class="product-card mx-2">
                <div class="relative">
                    <img src="${product.images[0]}" alt="${product.name}" class="w-full h-64 object-cover">
                    <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-display text-lg font-semibold mb-2 text-gray-800">${product.name}</h3>
                    <div class="flex items-center justify-between mb-3">
                        <span class="price-tag">$${product.price}</span>
                        <div class="flex items-center space-x-1">
                            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="text-sm text-gray-600">${product.rating}</span>
                        </div>
                    </div>
                    <button onclick="addToCart('${product.id}')" class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-full transition-all duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        trendingList.appendChild(slide);
    });
    
    // Initialize Splide carousel if available
    if (typeof Splide !== 'undefined') {
        new Splide('#trending-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '1rem',
            autoplay: true,
            interval: 3000,
            breakpoints: {
                768: {
                    perPage: 2,
                },
                480: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

function initializeProductsPage() {
    // Products page specific initialization
    console.log('Initializing products page');
}

function initializeCartPage() {
    // Cart page specific initialization
    console.log('Initializing cart page');
}

function initializeProfilePage() {
    // Profile page specific initialization
    console.log('Initializing profile page');
}

// Animation Functions
function animateElement(element, animation) {
    if (typeof anime !== 'undefined') {
        anime({
            targets: element,
            ...animation
        });
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

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

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.filterProducts = filterProducts;
window.showNotification = showNotification;