const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Get product reviews
// @route   GET /api/reviews/product/:productId
// @access  Public
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name avatar')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching reviews'
        });
    }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
    try {
        const { product, rating, title, comment } = req.body;

        // Check if product exists
        const productDoc = await Product.findById(product);
        if (!productDoc) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if user already reviewed
        const existingReview = await Review.findOne({ product, user: req.user.id });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            });
        }

        // Create review
        const review = await Review.create({
            product,
            user: req.user.id,
            rating,
            title,
            comment
        });

        // Update product rating
        const reviews = await Review.find({ product });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        productDoc.rating = avgRating;
        productDoc.reviewCount = reviews.length;
        await productDoc.save();

        await review.populate('user', 'name avatar');

        res.status(201).json({
            success: true,
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating review'
        });
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Make sure user owns the review
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this review'
            });
        }

        const { rating, title, comment } = req.body;

        review.rating = rating || review.rating;
        review.title = title || review.title;
        review.comment = comment || review.comment;

        await review.save();

        // Update product rating
        const reviews = await Review.find({ product: review.product });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await Product.findByIdAndUpdate(review.product, {
            rating: avgRating,
            reviewCount: reviews.length
        });

        await review.populate('user', 'name avatar');

        res.status(200).json({
            success: true,
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating review'
        });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Make sure user owns the review or is admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this review'
            });
        }

        const productId = review.product;
        await review.deleteOne();

        // Update product rating
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        await Product.findByIdAndUpdate(productId, {
            rating: avgRating,
            reviewCount: reviews.length
        });

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error deleting review'
        });
    }
};
