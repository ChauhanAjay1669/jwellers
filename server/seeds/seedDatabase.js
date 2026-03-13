const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers';

// Sample data
const categories = [
    { name: 'Rings', description: 'Elegant rings for every occasion', image: 'https://via.placeholder.com/300x200?text=Rings' },
    { name: 'Necklaces', description: 'Beautiful necklaces and chains', image: 'https://via.placeholder.com/300x200?text=Necklaces' },
    { name: 'Earrings', description: 'Stunning earrings collection', image: 'https://via.placeholder.com/300x200?text=Earrings' },
    { name: 'Bracelets', description: 'Stylish bracelets and bangles', image: 'https://via.placeholder.com/300x200?text=Bracelets' },
    { name: 'Watches', description: 'Luxury timepieces', image: 'https://via.placeholder.com/300x200?text=Watches' },
    { name: 'Pendants', description: 'Exquisite pendant designs', image: 'https://via.placeholder.com/300x200?text=Pendants' }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected');

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('🗑️  Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@jwellers.com',
            password: 'admin123',
            role: 'admin',
            phone: '+91 9876543210'
        });
        console.log('👤 Admin user created');

        // Create sample customer
        const customer = await User.create({
            name: 'John Doe',
            email: 'customer@example.com',
            password: 'customer123',
            phone: '+91 9876543211'
        });
        console.log('👤 Sample customer created');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`📁 Created ${createdCategories.length} categories`);

        // Create products
        const products = [];

        // Rings
        const ringCategory = createdCategories.find(c => c.name === 'Rings');
        products.push(
            {
                name: 'Diamond Solitaire Ring',
                description: 'Elegant 18K gold diamond solitaire ring with 0.5 carat center stone',
                price: 45000,
                originalPrice: 50000,
                category: ringCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Diamond+Ring'],
                material: '18K Gold',
                weight: { value: 3.5, unit: 'grams' },
                stockQuantity: 10,
                isFeatured: true,
                tags: ['diamond', 'engagement', 'luxury']
            },
            {
                name: 'Gold Band Ring',
                description: 'Simple and elegant 22K gold band ring',
                price: 15000,
                category: ringCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Gold+Band'],
                material: '22K Gold',
                weight: { value: 4.0, unit: 'grams' },
                stockQuantity: 25,
                tags: ['gold', 'simple', 'daily-wear']
            },
            {
                name: 'Ruby Cocktail Ring',
                description: 'Statement cocktail ring with ruby and diamonds',
                price: 65000,
                originalPrice: 70000,
                category: ringCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Ruby+Ring'],
                material: '18K Gold',
                weight: { value: 5.2, unit: 'grams' },
                stockQuantity: 5,
                isTrending: true,
                tags: ['ruby', 'diamond', 'party-wear']
            }
        );

        // Necklaces
        const necklaceCategory = createdCategories.find(c => c.name === 'Necklaces');
        products.push(
            {
                name: 'Pearl Necklace Set',
                description: 'Classic pearl necklace with matching earrings',
                price: 35000,
                category: necklaceCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Pearl+Necklace'],
                material: 'Pearl with Gold Plating',
                stockQuantity: 15,
                isFeatured: true,
                tags: ['pearl', 'set', 'traditional']
            },
            {
                name: 'Diamond Tennis Necklace',
                description: 'Stunning diamond tennis necklace in white gold',
                price: 125000,
                originalPrice: 135000,
                category: necklaceCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Tennis+Necklace'],
                material: '18K White Gold',
                weight: { value: 12.0, unit: 'grams' },
                stockQuantity: 3,
                isFeatured: true,
                isTrending: true,
                tags: ['diamond', 'luxury', 'party-wear']
            },
            {
                name: 'Gold Chain',
                description: 'Traditional 22K gold chain for daily wear',
                price: 28000,
                category: necklaceCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Gold+Chain'],
                material: '22K Gold',
                weight: { value: 8.0, unit: 'grams' },
                stockQuantity: 20,
                tags: ['gold', 'chain', 'daily-wear']
            }
        );

        // Earrings
        const earringCategory = createdCategories.find(c => c.name === 'Earrings');
        products.push(
            {
                name: 'Diamond Studs',
                description: 'Classic diamond stud earrings',
                price: 25000,
                category: earringCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Diamond+Studs'],
                material: '18K Gold',
                weight: { value: 2.0, unit: 'grams' },
                stockQuantity: 30,
                isFeatured: true,
                tags: ['diamond', 'studs', 'daily-wear']
            },
            {
                name: 'Emerald Drop Earrings',
                description: 'Elegant emerald drop earrings with diamonds',
                price: 55000,
                originalPrice: 60000,
                category: earringCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Emerald+Earrings'],
                material: '18K Gold',
                weight: { value: 6.5, unit: 'grams' },
                stockQuantity: 8,
                isTrending: true,
                tags: ['emerald', 'diamond', 'party-wear']
            }
        );

        // Bracelets
        const braceletCategory = createdCategories.find(c => c.name === 'Bracelets');
        products.push(
            {
                name: 'Gold Bangle Set',
                description: 'Set of 2 traditional gold bangles',
                price: 42000,
                category: braceletCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Gold+Bangles'],
                material: '22K Gold',
                weight: { value: 12.0, unit: 'grams' },
                stockQuantity: 12,
                tags: ['gold', 'bangles', 'traditional']
            },
            {
                name: 'Diamond Tennis Bracelet',
                description: 'Elegant diamond tennis bracelet',
                price: 85000,
                category: braceletCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Tennis+Bracelet'],
                material: '18K White Gold',
                weight: { value: 8.5, unit: 'grams' },
                stockQuantity: 6,
                isFeatured: true,
                tags: ['diamond', 'bracelet', 'luxury']
            }
        );

        // Watches
        const watchCategory = createdCategories.find(c => c.name === 'Watches');
        products.push(
            {
                name: 'Luxury Gold Watch',
                description: 'Premium automatic watch with gold plating',
                price: 95000,
                originalPrice: 105000,
                category: watchCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Gold+Watch'],
                material: 'Stainless Steel with Gold Plating',
                stockQuantity: 5,
                isTrending: true,
                tags: ['watch', 'luxury', 'automatic']
            },
            {
                name: 'Diamond Ladies Watch',
                description: 'Elegant ladies watch with diamond bezel',
                price: 150000,
                category: watchCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Diamond+Watch'],
                material: '18K Gold',
                stockQuantity: 3,
                isFeatured: true,
                tags: ['watch', 'diamond', 'luxury']
            }
        );

        // Pendants
        const pendantCategory = createdCategories.find(c => c.name === 'Pendants');
        products.push(
            {
                name: 'Heart Diamond Pendant',
                description: 'Beautiful heart-shaped diamond pendant',
                price: 32000,
                category: pendantCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Heart+Pendant'],
                material: '18K Gold',
                weight: { value: 3.0, unit: 'grams' },
                stockQuantity: 18,
                isFeatured: true,
                tags: ['diamond', 'pendant', 'romantic']
            },
            {
                name: 'Om Pendant',
                description: 'Traditional Om symbol pendant in gold',
                price: 12000,
                category: pendantCategory._id,
                images: ['https://via.placeholder.com/500x500?text=Om+Pendant'],
                material: '22K Gold',
                weight: { value: 2.5, unit: 'grams' },
                stockQuantity: 25,
                tags: ['gold', 'pendant', 'religious']
            }
        );

        const createdProducts = await Product.insertMany(products);
        console.log(`💍 Created ${createdProducts.length} products`);

        console.log('\n✨ Database seeded successfully!\n');
        console.log('Login credentials:');
        console.log('Admin - Email: admin@jwellers.com, Password: admin123');
        console.log('Customer - Email: customer@example.com, Password: customer123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
