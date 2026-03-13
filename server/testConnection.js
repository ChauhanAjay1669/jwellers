const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

async function test() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers');
        console.log('✅ Connected to MongoDB successfully!\n');

        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();

        console.log('📊 Database Statistics:');
        console.log(`   📦 Products: ${productCount}`);
        console.log(`   📁 Categories: ${categoryCount}\n`);

        if (productCount === 0) {
            console.log('⚠️  WARNING: No products found!');
            console.log('   Run this command to seed data: node seedDatabase.js\n');
        }

        if (categoryCount === 0) {
            console.log('⚠️  WARNING: No categories found!');
            console.log('   Run this command to seed data: node seedDatabase.js\n');
        }

        if (productCount > 0) {
            console.log('📌 Sample Product:');
            const firstProduct = await Product.findOne().populate('category');
            console.log(`   Name: ${firstProduct.name}`);
            console.log(`   Price: ₹${firstProduct.price.toLocaleString()}`);
            console.log(`   Stock: ${firstProduct.stockQuantity}`);
            console.log(`   Category: ${firstProduct.category?.name || 'None'}`);
            console.log(`   Featured: ${firstProduct.isFeatured ? 'Yes' : 'No'}`);
            console.log(`   Active: ${firstProduct.isActive ? 'Yes' : 'No'}\n`);
        }

        if (categoryCount > 0) {
            console.log('📌 Sample Categories (first 5):');
            const categories = await Category.find().limit(5);
            categories.forEach((cat, index) => {
                console.log(`   ${index + 1}. ${cat.name} (${cat.slug})`);
            });
            console.log('');
        }

        await mongoose.disconnect();
        console.log('✅ Test complete! Disconnected from MongoDB.');

        if (productCount > 0 && categoryCount > 0) {
            console.log('\n🎉 Everything looks good! Your database has data.');
            console.log('   If data still not showing in frontend, check:');
            console.log('   1. Backend server is running (npm run dev in server folder)');
            console.log('   2. Frontend is running (npm run dev in client folder)');
            console.log('   3. Check browser console for errors (F12)');
        }

        process.exit(0);
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.log('\n🔍 Possible solutions:');
        console.log('   1. Make sure MongoDB is running');
        console.log('      Windows: net start MongoDB');
        console.log('      Mac: brew services start mongodb-community');
        console.log('   2. Check your connection string in .env file');
        console.log('   3. Try connecting with MongoDB Compass to verify\n');
        process.exit(1);
    }
}

test();
