const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers';

async function createAdminUser() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected!\n');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@jwellers.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email: admin@jwellers.com');
            console.log('🔑 Password: admin123');
            console.log('👤 Role:', existingAdmin.role);
            console.log('\n💡 You can login with these credentials.');
            return;
        }

        // Create admin user
        console.log('👤 Creating admin user...');
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@jwellers.com',
            password: 'admin123',
            role: 'admin',
            phone: '+91 9876543210'
        });

        console.log('✅ Admin user created successfully!\n');
        console.log('═══════════════════════════════════════');
        console.log('📧 Email: admin@jwellers.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Name:', adminUser.name);
        console.log('🎭 Role:', adminUser.role);
        console.log('═══════════════════════════════════════');
        console.log('\n🚀 You can now login at: http://localhost:5173/login');
        console.log('📍 Then navigate to: http://localhost:5173/admin');
        console.log('\n💡 IMPORTANT: Change the password after first login!\n');

    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Connection closed.');
        process.exit(0);
    }
}

createAdminUser();
