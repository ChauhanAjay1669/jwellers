const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers';

async function verifyDatabase() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        console.log(`📍 URI: ${MONGODB_URI}`);

        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB connected successfully!\n');

        // Check collections
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        console.log('📦 Available Collections:');
        collections.forEach(col => console.log(`   - ${col.name}`));
        console.log('');

        // Check products
        const productsCount = await db.collection('products').countDocuments();
        console.log(`📊 Products in database: ${productsCount}`);

        if (productsCount > 0) {
            console.log('\n📋 Sample Products:');
            const sampleProducts = await db.collection('products').find({}).limit(3).toArray();
            sampleProducts.forEach((product, index) => {
                console.log(`\n${index + 1}. ${product.name}`);
                console.log(`   - Price: ₹${product.price}`);
                console.log(`   - Category: ${product.category}`);
                console.log(`   - Images: ${product.images?.length || 0}`);
                console.log(`   - isActive: ${product.isActive}`);
                console.log(`   - isFeatured: ${product.isFeatured}`);
                console.log(`   - isTrending: ${product.isTrending}`);
            });
        } else {
            console.log('⚠️  No products found in database!');
        }

        // Check categories
        const categoriesCount = await db.collection('categories').countDocuments();
        console.log(`\n📊 Categories in database: ${categoriesCount}`);

        if (categoriesCount > 0) {
            console.log('\n📁 Available Categories:');
            const categories = await db.collection('categories').find({}).toArray();
            categories.forEach(cat => {
                console.log(`   - ${cat.name} (ID: ${cat._id})`);
            });
        } else {
            console.log('⚠️  No categories found in database!');
            console.log('💡 You need to create categories before adding products.');
        }

        console.log('\n✅ Database verification complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.name === 'MongooseServerSelectionError') {
            console.error('\n💡 MongoDB is not running. Please start MongoDB first:');
            console.error('   Run: "C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe" --dbpath "C:\\data\\db"');
        }
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Database connection closed.');
        process.exit(0);
    }
}

verifyDatabase();
