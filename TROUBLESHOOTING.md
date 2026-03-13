# Troubleshooting Guide - Data Not Showing

## Issue: Data added to MongoDB but not displaying

Let's diagnose the problem step by step:

## Step 1: Check if MongoDB is Running

### Windows
Open Command Prompt and run:
```bash
net start MongoDB
```

Or check if it's running:
```bash
sc query MongoDB
```

### Alternative: Use MongoDB Compass
1. Open MongoDB Compass
2. Try connecting to `mongodb://localhost:27017`
3. If it connects, MongoDB is running

---

## Step 2: Verify Database Connection

Check your `.env` file in the `server` folder:

```env
MONGODB_URI=mongodb://localhost:27017/jwellers
PORT=5000
JWT_SECRET=your-secret-key-here
```

Make sure:
- The database name is `jwellers`
- The connection string is correct

---

## Step 3: Run the Seed Script

```bash
cd server
node seedDatabase.js
```

**Expected output:**
```
 Connected to MongoDB
  Clearing existing data...
 Creating categories...
 Created 32 categories
 Creating products...
 Created 14 products

🎉 Database seeded successfully!
```

**If you see errors:**
- `MongoServerError: connect ECONNREFUSED` → MongoDB is not running
- `MongoServerError: E11000 duplicate key` → Data already exists (this is okay)

---

## Step 4: Verify Data in MongoDB

### Option A: MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database `jwellers`
4. Check `categories` collection - should have 32 items
5. Check `products` collection - should have 14 items

### Option B: MongoDB Shell
```bash
mongo
use jwellers
db.categories.count()  // Should return 32
db.products.count()    // Should return 14
```

---

## Step 5: Test Backend API

### Start the server:
```bash
cd server
npm run dev
```

### Test API endpoints:

**Test Categories:**
```bash
curl http://localhost:5000/api/categories
```

Or open in browser: http://localhost:5000/api/categories

**Test Products:**
```bash
curl http://localhost:5000/api/products
```

Or open in browser: http://localhost:5000/api/products

**Expected response:**
```json
{
  "success": true,
  "count": 14,
  "products": [...]
}
```

---

## Step 6: Check Frontend

### Start the frontend:
```bash
cd client
npm run dev
```

### Open browser console (F12) and check for errors:
- Network errors (red in Network tab)
- JavaScript errors (red in Console tab)
- Failed API calls

### Common Issues:

**CORS Error:**
```
Access to fetch at 'http://localhost:5000/api/products' has been blocked by CORS policy
```
**Fix:** Check `server.js` has correct CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Network Error:**
```
GET http://localhost:5000/api/products net::ERR_CONNECTION_REFUSED
```
**Fix:** Backend server is not running. Start it with `npm run dev`

**401 Unauthorized:**
```
{"success": false, "message": "Not authorized"}
```
**Fix:** You need to be logged in. Some endpoints require authentication.

---

## Step 7: Quick Debug Script

Create a file `testConnection.js` in the `server` folder:

```javascript
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers');
        console.log('✅ Connected to MongoDB');

        const productCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();

        console.log(`📦 Products: ${productCount}`);
        console.log(`📁 Categories: ${categoryCount}`);

        if (productCount === 0) {
            console.log('⚠️  No products found! Run: node seedDatabase.js');
        }

        if (categoryCount === 0) {
            console.log('⚠️  No categories found! Run: node seedDatabase.js');
        }

        if (productCount > 0) {
            const firstProduct = await Product.findOne().populate('category');
            console.log('\n📌 First Product:');
            console.log(`   Name: ${firstProduct.name}`);
            console.log(`   Price: ₹${firstProduct.price}`);
            console.log(`   Category: ${firstProduct.category?.name || 'None'}`);
        }

        await mongoose.disconnect();
        console.log('\n✅ Test complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

test();
```

Run it:
```bash
cd server
node testConnection.js
```

---

## Common Solutions

### 1. MongoDB Not Running
**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
brew services start mongodb-community
# or
sudo systemctl start mongod
```

### 2. Data Not Seeding
```bash
cd server
# Make sure MongoDB is running first
node seedDatabase.js
```

### 3. Backend Not Starting
```bash
cd server
npm install  # Install dependencies
npm run dev
```

### 4. Frontend Not Connecting
Check `client/src/utils/axios.js`:
```javascript
const instance = axios.create({
    baseURL: 'http://localhost:5000/api',  // ← Check this matches your backend port
    withCredentials: true
});
```

### 5. CORS Issues
In `server/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',  // ← Check this matches your frontend port
  credentials: true
}));
```

---

## Still Not Working?

**Send me this information:**

1. Output of `node seedDatabase.js`
2. Output of `node testConnection.js` (after creating the script above)
3. Backend console errors (when running `npm run dev` in server folder)
4. Frontend browser console errors (F12 → Console tab)
5. Network tab showing failed requests (F12 → Network tab)

I'll help you fix it! 🛠️
