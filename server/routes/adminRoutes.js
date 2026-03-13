const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Apply protect and admin middleware to all routes
router.use(protect);
router.use(admin);

// Dashboard statistics
router.get('/stats', adminController.getDashboardStats);

// Bulk operations
router.post('/products/bulk-delete', adminController.bulkDeleteProducts);
router.post('/categories/bulk-delete', adminController.bulkDeleteCategories);

// Export data
router.get('/export/products', adminController.exportProducts);
router.get('/export/categories', adminController.exportCategories);

// Product status toggle
router.patch('/products/:id/toggle', adminController.toggleProductStatus);

module.exports = router;
