# Database Setup Guide

## ✅ Fixed: categoryIds Error

The seed script has been updated to fix any potential issues with the `categoryIds` reference.

## 🚀 How to Run the Seed Script

### Step 1: Make Sure MongoDB is Running

**Option A: Using MongoDB Service (Windows)**
```bash
# Start MongoDB service
net start MongoDB
```

**Option B: Using MongoDB Compass**
- Open MongoDB Compass
- Connect to `mongodb://localhost:27017`

**Option C: Using mongod directly**
```bash
# Navigate to MongoDB bin folder and run
mongod --dbpath="C:\data\db"
```

### Step 2: Run the Seed Script

```bash
# From the server directory
cd server
node seedDatabase.js
```

### Expected Output

When successful, you should see:
```
✅ Connected to MongoDB
🗑️  Clearing existing data...
📦 Creating categories...
✅ Created 5 categories
📦 Creating products...
✅ Created 14 products

🎉 Database seeded successfully!

📊 Summary:
   - Categories: 5
   - Products: 14
   - Featured Products: 8
   - Trending Products: 9

✅ Disconnected from MongoDB
```

## 🔧 Troubleshooting

### Error: "categoryIds is not defined"
**Fixed!** The script has been updated to properly define `categoryIds` before using it.

### Error: "ECONNREFUSED" or connection timeout
**Solution:** Start MongoDB first (see Step 1 above)

### Error: "MongoServerError: E11000 duplicate key error"
**Solution:** The script tries to insert duplicate data. This happens if you run it twice. It will automatically clear old data before inserting new data.

### Error: Module not found
**Solution:** Install dependencies first:
```bash
cd server
npm install
```

## 📝 What Gets Created

- **5 Categories**: Rings, Necklaces, Earrings, Bracelets, Pendants
- **14 Products**: Various jewelry items with images, prices, descriptions

## 🎯 Next Steps

After seeding the database:

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **View your products:**
   - Open http://localhost:5173
   - Browse the product catalog

4. **Test the API:**
   - GET http://localhost:5000/api/products
   - GET http://localhost:5000/api/categories
