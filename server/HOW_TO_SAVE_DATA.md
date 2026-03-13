# How to Save Data to the Database

This project uses **MongoDB** as the database and **Mongoose** as the Object Data Modeling (ODM) library.

## Prerequisites

Ensure your MongoDB server is running. The application connects to:
`mongodb://localhost:27017/jwellers`

## Method 1: Using a Standalone Script (Command Line)

This is useful for seeding data or testing without using the API.

1.  **Create a script file** (e.g., `save-product.js`) in the `server` directory.

```javascript
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Import the model
const dotenv = require('dotenv');

// Load env vars for DB URI if needed, or hardcode for local test
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jwellers';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

const saveProduct = async () => {
  try {
    // 1. Create a new instance of the model
    const newProduct = new Product({
      name: "Elegant Gold Necklace",
      description: "A beautiful 24k gold necklace.",
      price: 1200,
      category: "64f8a1234567890123456789", // ⚠️ Replace with a valid Category ID from your DB
      images: ["/uploads/necklace1.jpg"],
      stockQuantity: 10,
      isActive: true
    });

    // 2. Save to database
    const savedProduct = await newProduct.save();
    console.log('✅ Product saved:', savedProduct);

  } catch (error) {
    console.error('❌ Error saving product:', error.message);
  } finally {
    // 3. Close connection
    mongoose.connection.close();
  }
};

saveProduct();
```

2.  **Run the script** from your terminal:
    ```bash
    cd server
    node save-product.js
    ```

## Method 2: Inside an API Controller

This is how the application saves data when a user interacts with the frontend.

**Example from `server/controllers/productController.js`:**

```javascript
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    // 1. Extract data from request body
    const { name, description, price, category, stockQuantity } = req.body;

    // 2. Create new instance
    const product = new Product({
      name,
      description,
      price,
      category,
      stockQuantity,
      images: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    });

    // 3. Save to database
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

## Key Concepts

1.  **Model**: Represents a collection in MongoDB (e.g., `Product` -> `products`).
2.  **Schema**: Defines the structure of the documents (fields, types, validation).
3.  **Instance**: A single document object created from the Model.
4.  **`.save()`**: The Mongoose method that validates the document and writes it to MongoDB.
