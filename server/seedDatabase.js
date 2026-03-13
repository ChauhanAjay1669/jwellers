const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config();

// Comprehensive jewelry categories
const categories = [
    { name: 'Necklaces', description: 'Stunning necklaces to complement your style', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Earrings', description: 'Beautiful earrings for any outfit', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
    { name: 'Rings', description: 'Elegant rings for every occasion', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
    { name: 'Bracelets', description: 'Exquisite bracelets for your wrists', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Anklets', description: 'Delicate anklets for traditional charm', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Bangles', description: 'Traditional bangles and kada', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Pendants', description: 'Delicate pendants and lockets', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500' },
    { name: 'Chains', description: 'Gold and silver chains', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500' },
    { name: 'Nose Pins', description: 'Traditional nose pins and studs', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
    { name: 'Toe Rings', description: 'Elegant toe rings for traditional wear', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
    { name: 'Mangalsutra', description: 'Sacred mangalsutra designs', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Engagement Rings', description: 'Beautiful engagement rings for your special day', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
    { name: 'Wedding Rings', description: 'Classic wedding bands and rings', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Chokers', description: 'Trendy choker necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Jhumkas', description: 'Traditional Indian jhumka earrings', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500' },
    { name: 'Hoop Earrings', description: 'Stylish hoop earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
    { name: 'Stud Earrings', description: 'Elegant stud earrings for everyday wear', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500' },
    { name: 'Kada', description: 'Traditional kada and cuffs', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Maang Tikka', description: 'Bridal maang tikka designs', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Armlets', description: 'Decorative armlets and bajubandh', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Brooches', description: 'Elegant brooches and pins', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500' },
    { name: 'Waist Chains', description: 'Traditional waist chains and kamarbandh', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Hair Accessories', description: 'Decorative hair pins and accessories', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Gold Jewellery', description: 'Pure gold jewelry collection', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Diamond Jewellery', description: 'Sparkling diamond jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
    { name: 'Silver Jewellery', description: 'Sterling silver jewelry pieces', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Platinum Jewellery', description: 'Premium platinum jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
    { name: 'Rose Gold Jewellery', description: 'Trendy rose gold pieces', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Temple Jewellery', description: 'Traditional temple jewelry designs', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
    { name: 'Antique Jewellery', description: 'Vintage and antique jewelry collection', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { name: 'Fashion Jewellery', description: 'Trendy fashion jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
    { name: 'Bridal Jewellery', description: 'Complete bridal jewelry sets', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' }
];

// Sample products (will be populated with category IDs after categories are created)
const getProducts = (categoryIds) => [
    // Rings
    {
        name: 'Diamond Solitaire Ring',
        description: 'Stunning 18K white gold solitaire ring featuring a brilliant-cut diamond. Perfect for engagements and special occasions.',
        price: 85000,
        originalPrice: 95000,
        category: categoryIds['Rings'],
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800'
        ],
        material: '18K White Gold',
        weight: { value: 3.5, unit: 'grams' },
        stockQuantity: 15,
        isFeatured: true,
        isTrending: true,
        rating: 4.8,
        reviewCount: 124,
        tags: ['diamond', 'engagement', 'luxury', 'white-gold']
    },
    {
        name: 'Gold Wedding Band',
        description: 'Classic 22K yellow gold wedding band with a smooth, polished finish. Timeless elegance for your special day.',
        price: 35000,
        originalPrice: 38000,
        category: categoryIds['Rings'],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800'
        ],
        material: '22K Yellow Gold',
        weight: { value: 5.2, unit: 'grams' },
        stockQuantity: 25,
        isFeatured: false,
        isTrending: true,
        rating: 4.9,
        reviewCount: 89,
        tags: ['wedding', 'gold', 'classic']
    },
    {
        name: 'Ruby Gemstone Ring',
        description: 'Exquisite ruby and diamond ring set in platinum. The perfect statement piece for any occasion.',
        price: 125000,
        originalPrice: 140000,
        category: categoryIds['Rings'],
        images: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800'
        ],
        material: 'Platinum',
        weight: { value: 4.8, unit: 'grams' },
        stockQuantity: 8,
        isFeatured: true,
        isTrending: false,
        rating: 4.7,
        reviewCount: 56,
        tags: ['ruby', 'gemstone', 'platinum', 'luxury']
    },

    // Necklaces
    {
        name: 'Pearl Strand Necklace',
        description: 'Elegant freshwater pearl necklace with 18K gold clasp. A timeless addition to your jewelry collection.',
        price: 45000,
        originalPrice: 50000,
        category: categoryIds['Necklaces'],
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800'
        ],
        material: 'Freshwater Pearls & 18K Gold',
        weight: { value: 12.5, unit: 'grams' },
        stockQuantity: 20,
        isFeatured: true,
        isTrending: false,
        rating: 4.6,
        reviewCount: 92,
        tags: ['pearl', 'classic', 'elegant']
    },
    {
        name: 'Gold Chain Necklace',
        description: 'Beautiful 22K gold chain necklace with intricate design. Perfect for both casual and formal wear.',
        price: 65000,
        originalPrice: 70000,
        category: categoryIds['Necklaces'],
        images: [
            'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800'
        ],
        material: '22K Yellow Gold',
        weight: { value: 15.3, unit: 'grams' },
        stockQuantity: 12,
        isFeatured: false,
        isTrending: true,
        rating: 4.8,
        reviewCount: 67,
        tags: ['gold', 'chain', 'traditional']
    },
    {
        name: 'Diamond Tennis Necklace',
        description: 'Luxurious tennis necklace featuring brilliant-cut diamonds set in white gold. A show-stopping piece.',
        price: 195000,
        originalPrice: 215000,
        category: categoryIds['Necklaces'],
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800'
        ],
        material: '18K White Gold & Diamonds',
        weight: { value: 18.7, unit: 'grams' },
        stockQuantity: 5,
        isFeatured: true,
        isTrending: true,
        rating: 5.0,
        reviewCount: 43,
        tags: ['diamond', 'tennis', 'luxury', 'white-gold']
    },

    // Earrings
    {
        name: 'Diamond Stud Earrings',
        description: 'Classic diamond stud earrings in 18K white gold. Perfect for everyday elegance.',
        price: 55000,
        originalPrice: 60000,
        category: categoryIds['Earrings'],
        images: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800'
        ],
        material: '18K White Gold & Diamonds',
        weight: { value: 2.1, unit: 'grams' },
        stockQuantity: 30,
        isFeatured: true,
        isTrending: true,
        rating: 4.9,
        reviewCount: 156,
        tags: ['diamond', 'stud', 'minimalist', 'everyday']
    },
    {
        name: 'Gold Jhumka Earrings',
        description: 'Traditional Indian jhumka earrings in 22K gold with intricate filigree work.',
        price: 38000,
        originalPrice: 42000,
        category: categoryIds['Earrings'],
        images: [
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800'
        ],
        material: '22K Yellow Gold',
        weight: { value: 8.5, unit: 'grams' },
        stockQuantity: 18,
        isFeatured: false,
        isTrending: true,
        rating: 4.7,
        reviewCount: 78,
        tags: ['traditional', 'jhumka', 'gold', 'indian']
    },
    {
        name: 'Emerald Drop Earrings',
        description: 'Stunning emerald and diamond drop earrings set in white gold. Perfect for special occasions.',
        price: 95000,
        originalPrice: 105000,
        category: categoryIds['Earrings'],
        images: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800'
        ],
        material: '18K White Gold, Emeralds & Diamonds',
        weight: { value: 6.3, unit: 'grams' },
        stockQuantity: 10,
        isFeatured: true,
        isTrending: false,
        rating: 4.8,
        reviewCount: 45,
        tags: ['emerald', 'drop', 'gemstone', 'luxury']
    },

    // Bracelets
    {
        name: 'Gold Bangle Set',
        description: 'Set of 2 traditional 22K gold bangles with intricate patterns. A classic addition to any collection.',
        price: 75000,
        originalPrice: 82000,
        category: categoryIds['Bracelets'],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800'
        ],
        material: '22K Yellow Gold',
        weight: { value: 35.5, unit: 'grams' },
        stockQuantity: 14,
        isFeatured: false,
        isTrending: true,
        rating: 4.8,
        reviewCount: 102,
        tags: ['bangle', 'gold', 'traditional', 'set']
    },
    {
        name: 'Diamond Tennis Bracelet',
        description: 'Elegant tennis bracelet featuring brilliant-cut diamonds in white gold setting.',
        price: 145000,
        originalPrice: 160000,
        category: categoryIds['Bracelets'],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'
        ],
        material: '18K White Gold & Diamonds',
        weight: { value: 12.8, unit: 'grams' },
        stockQuantity: 7,
        isFeatured: true,
        isTrending: true,
        rating: 4.9,
        reviewCount: 67,
        tags: ['diamond', 'tennis', 'bracelet', 'luxury']
    },

    // Pendants
    {
        name: 'Solitaire Diamond Pendant',
        description: 'Simple yet elegant solitaire diamond pendant on an 18K white gold chain.',
        price: 42000,
        originalPrice: 46000,
        category: categoryIds['Pendants'],
        images: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'
        ],
        material: '18K White Gold & Diamond',
        weight: { value: 3.2, unit: 'grams' },
        stockQuantity: 22,
        isFeatured: true,
        isTrending: false,
        rating: 4.7,
        reviewCount: 88,
        tags: ['diamond', 'pendant', 'solitaire', 'minimalist']
    },
    {
        name: 'Gold Ganesh Pendant',
        description: 'Traditional Lord Ganesh pendant in 22K gold. A spiritual and beautiful piece.',
        price: 28000,
        originalPrice: 31000,
        category: categoryIds['Pendants'],
        images: [
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800'
        ],
        material: '22K Yellow Gold',
        weight: { value: 6.5, unit: 'grams' },
        stockQuantity: 16,
        isFeatured: false,
        isTrending: false,
        rating: 4.9,
        reviewCount: 134,
        tags: ['traditional', 'ganesh', 'gold', 'spiritual']
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers');

        console.log(' Connected to MongoDB');

        // Clear existing data
        console.log('  Clearing existing data...');
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Insert categories
        console.log(' Creating categories...');
        const createdCategories = await Category.insertMany(categories);
        console.log(` Created ${createdCategories.length} categories`);

        // Create a map of category names to IDs
        const categoryIds = {};
        createdCategories.forEach(cat => {
            categoryIds[cat.name] = cat._id;
        });

        // Insert products
        console.log(' Creating products...');
        const products = getProducts(categoryIds);
        const createdProducts = await Product.insertMany(products);
        console.log(` Created ${createdProducts.length} products`);

        console.log('\n Database seeded successfully!');
        console.log('\n Summary:');
        console.log(`   - Categories: ${createdCategories.length}`);
        console.log(`   - Products: ${createdProducts.length}`);
        console.log(`   - Featured Products: ${createdProducts.filter(p => p.isFeatured).length}`);
        console.log(`   - Trending Products: ${createdProducts.filter(p => p.isTrending).length}`);

        // Disconnect
        await mongoose.disconnect();
        console.log('\n Disconnected from MongoDB');
        process.exit(0);

    } catch (error) {
        console.error(' Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
