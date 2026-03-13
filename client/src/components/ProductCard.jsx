import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

const ProductCard = ({ product, imageHeight = "h-64", imageClasses }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [isAdding, setIsAdding] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await addToCart(product._id, 1);
        setIsAdding(false);
    };

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        setWishlistLoading(true);

        if (isInWishlist(product._id)) {
            await removeFromWishlist(product._id);
        } else {
            await addToWishlist(product._id);
        }

        setWishlistLoading(false);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const inWishlist = isInWishlist(product._id);

    return (
        <Link to={`/products/${product._id}`} className="product-card">
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100">
                <img
                    src={product.images[0] || 'https://via.placeholder.com/400x400?text=No+Image'}
                    alt={product.name}
                    className={imageClasses || `product-card-image ${imageHeight}`}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isFeatured && (
                        <span className="badge-featured">Featured</span>
                    )}
                    {product.isTrending && (
                        <span className="badge-trending">Trending</span>
                    )}
                    {discountPercentage > 0 && (
                        <span className="badge bg-red-600 text-white">
                            -{discountPercentage}%
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleWishlistToggle}
                        disabled={wishlistLoading}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${inWishlist
                                ? 'bg-gold-600 text-white'
                                : 'bg-white hover:bg-gold-600 hover:text-white'
                            }`}
                    >
                        <Heart
                            className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
                        />
                    </button>
                </div>

                {/* Add to Cart Button - Shows on Hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || product.stockQuantity === 0}
                        className="w-full btn-primary rounded-none flex items-center justify-center gap-2 py-3"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {isAdding ? 'Adding...' : product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category */}
                {product.category && (
                    <p className="text-xs text-gold-600 font-semibold uppercase tracking-wide mb-1">
                        {product.category.name}
                    </p>
                )}

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                    ? 'fill-gold-500 text-gold-500'
                                    : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">
                        ({product.reviewCount || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-luxury-dark">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Material Info */}
                {product.material && (
                    <p className="text-xs text-gray-600 mt-2">
                        {product.material}
                    </p>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
