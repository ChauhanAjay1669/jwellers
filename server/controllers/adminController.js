const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        // Get total counts
        const totalProducts = await Product.countDocuments();
        const activeProducts = await Product.countDocuments({ isActive: true });
        const featuredProducts = await Product.countDocuments({ isFeatured: true });
        const trendingProducts = await Product.countDocuments({ isTrending: true });
        const totalCategories = await Category.countDocuments();

        // Get low stock products (quantity < 10)
        const lowStockProducts = await Product.countDocuments({ stockQuantity: { $lt: 10 } });

        // Get order statistics
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const completedOrders = await Order.countDocuments({ status: 'delivered' });

        // Calculate total revenue
        const revenueData = await Order.aggregate([
            { $match: { status: { $in: ['delivered', 'shipped'] } } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
        ]);
        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Get recent low stock products
        const lowStockList = await Product.find({ stockQuantity: { $lt: 10 } })
            .select('name stockQuantity price')
            .limit(10)
            .sort('stockQuantity');

        res.status(200).json({
            success: true,
            stats: {
                products: {
                    total: totalProducts,
                    active: activeProducts,
                    featured: featuredProducts,
                    trending: trendingProducts,
                    lowStock: lowStockProducts
                },
                categories: {
                    total: totalCategories
                },
                orders: {
                    total: totalOrders,
                    pending: pendingOrders,
                    completed: completedOrders
                },
                revenue: {
                    total: totalRevenue
                },
                lowStockList
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching dashboard statistics'
        });
    }
};

// @desc    Bulk delete products
// @route   POST /api/admin/products/bulk-delete
// @access  Private/Admin
exports.bulkDeleteProducts = async (req, res) => {
    try {
        const { productIds } = req.body;

        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of product IDs'
            });
        }

        const result = await Product.deleteMany({ _id: { $in: productIds } });

        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} products`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting products'
        });
    }
};

// @desc    Bulk delete categories
// @route   POST /api/admin/categories/bulk-delete
// @access  Private/Admin
exports.bulkDeleteCategories = async (req, res) => {
    try {
        const { categoryIds } = req.body;

        if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of category IDs'
            });
        }

        // Check if any products are using these categories
        const productsUsingCategories = await Product.countDocuments({
            category: { $in: categoryIds }
        });

        if (productsUsingCategories > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete categories. ${productsUsingCategories} products are still using these categories.`
            });
        }

        const result = await Category.deleteMany({ _id: { $in: categoryIds } });

        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} categories`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting categories'
        });
    }
};

// @desc    Toggle product status (featured, trending, active)
// @route   PATCH /api/admin/products/:id/toggle
// @access  Private/Admin
exports.toggleProductStatus = async (req, res) => {
    try {
        const { field, value } = req.body;

        if (!['isFeatured', 'isTrending', 'isActive'].includes(field)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid field. Must be isFeatured, isTrending, or isActive'
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { [field]: value },
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
            message: error.message || 'Error updating product status'
        });
    }
};

// @desc    Export products to CSV
// @route   GET /api/admin/export/products
// @access  Private/Admin
exports.exportProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')
            .sort('-createdAt');

        // Create CSV header
        const csvHeader = 'ID,Name,Description,Price,Original Price,Category,Material,Stock,Featured,Trending,Active,Rating,Created At\n';

        // Create CSV rows
        const csvRows = products.map(product => {
            return `"${product._id}","${product.name}","${product.description.replace(/"/g, '""')}",${product.price},${product.originalPrice || ''},${product.category?.name || ''},"${product.material || ''}",${product.stockQuantity},${product.isFeatured},${product.isTrending},${product.isActive},${product.rating},"${product.createdAt}"`;
        }).join('\n');

        const csv = csvHeader + csvRows;

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error exporting products'
        });
    }
};

// @desc    Export categories to CSV
// @route   GET /api/admin/export/categories
// @access  Private/Admin
exports.exportCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort('name');

        // Create CSV header
        const csvHeader = 'ID,Name,Slug,Description,Active,Created At\n';

        // Create CSV rows
        const csvRows = categories.map(category => {
            return `"${category._id}","${category.name}","${category.slug}","${category.description || ''}",${category.isActive},"${category.createdAt}"`;
        }).join('\n');

        const csv = csvHeader + csvRows;

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=categories.csv');
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error exporting categories'
        });
    }
};
