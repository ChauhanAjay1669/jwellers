# Database Seeding Guide

## Quick Start

Run this command from the `server` directory to populate your database with demo data:

```bash
node seedDatabase.js
```

## What Gets Added

### Categories (5 total)
1. **Rings** - Elegant rings for every occasion
2. **Necklaces** - Stunning necklaces to complement your style
3. **Earrings** - Beautiful earrings for any outfit
4. **Bracelets** - Exquisite bracelets and bangles
5. **Pendants** - Delicate pendants and chains

### Products (14 total)

#### Rings
- Diamond Solitaire Ring - ₹85,000 (Featured & Trending)
- Gold Wedding Band - ₹35,000 (Trending)
- Ruby Gemstone Ring - ₹125,000 (Featured)

#### Necklaces
- Pearl Strand Necklace - ₹45,000 (Featured)
- Gold Chain Necklace - ₹65,000 (Trending)
- Diamond Tennis Necklace - ₹195,000 (Featured & Trending)

#### Earrings
- Diamond Stud Earrings - ₹55,000 (Featured & Trending)
- Gold Jhumka Earrings - ₹38,000 (Trending)
- Emerald Drop Earrings - ₹95,000 (Featured)

#### Bracelets
- Gold Bangle Set - ₹75,000 (Trending)
- Diamond Tennis Bracelet - ₹145,000 (Featured & Trending)

#### Pendants
- Solitaire Diamond Pendant - ₹42,000 (Featured)
- Gold Ganesh Pendant - ₹28,000

## Features

✅ All products include:
- High-quality images from Unsplash
- Detailed descriptions
- Material specifications
- Weight and dimensions
- Stock quantities
- Ratings and review counts
- Featured/Trending flags
- Relevant tags for filtering

## Environment Setup

Make sure your `.env` file has the MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/jwellers
```

Or it will default to `mongodb://localhost:27017/jwellers`

## Running the Script

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Run the seed script:
   ```bash
   node seedDatabase.js
   ```

3. You should see output like:
   ```
   ✅ Connected to MongoDB
   🗑️  Clearing existing data...
   📦 Creating categories...
   ✅ Created 5 categories
   📦 Creating products...
   ✅ Created 14 products
   
   🎉 Database seeded successfully!
   ```

## Note

⚠️ **Warning**: This script will DELETE all existing categories and products before adding the demo data. Only run this on development databases!

## Customization

You can easily add more products by editing the `seedDatabase.js` file and adding items to the `getProducts()` function.
