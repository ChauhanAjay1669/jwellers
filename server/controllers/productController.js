const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const {
            category,
            search,
            minPrice,
            maxPrice,
            material,
            isFeatured,
            isTrending,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 12
        } = req.query;

        // Build query
        const query = { isActive: true };

        if (category) query.category = category;
        if (search) query.$text = { $search: search };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (material) query.material = material;
        if (isFeatured) query.isFeatured = isFeatured === 'true';
        if (isTrending) query.isTrending = isTrending === 'true';

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        // Pagination
        const skip = (page - 1) * limit;

        // Execute query
        const products = await Product.find(query)
            .populate('category', 'name slug')
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: Number(page),
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching products'
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching product'
        });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating product'
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating product'
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting product'
        });
    }
};

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
exports.uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image'
            });
        }

        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $push: { images: { $each: imageUrls } } },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            images: imageUrls,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error uploading images'
        });
    }
};

// @desc    Get all products for admin (including inactive)
// @route   GET /api/admin/products
// @access  Private/Admin
exports.getAllProductsAdmin = async (req, res) => {
    try {
        const {
            category,
            search,
            isFeatured,
            isTrending,
            isActive,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 20
        } = req.query;

        // Build query (no isActive filter for admin)
        const query = {};

        if (category) query.category = category;
        if (search) query.$text = { $search: search };
        if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
        if (isTrending !== undefined) query.isTrending = isTrending === 'true';
        if (isActive !== undefined) query.isActive = isActive === 'true';

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        // Pagination
        const skip = (page - 1) * limit;

        // Execute query
        const products = await Product.find(query)
            .populate('category', 'name slug')
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: Number(page),
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching products'
        });
    }
};

