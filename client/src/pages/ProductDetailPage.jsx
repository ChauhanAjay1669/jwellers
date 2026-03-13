import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewSection from '../components/ReviewSection';
import ReviewForm from '../components/ReviewForm';
import { ShoppingCart, Heart, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productAPI.getById(id);
            setProduct(response.data.product);
        } catch (err) {
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await reviewAPI.getProductReviews(id);
            setReviews(response.data.reviews);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        } finally {
            setReviewsLoading(false);
        }
    };

    const handleAddToCart = async () => {
        await addToCart(product._id, quantity);
    };

    const handleWishlistToggle = async () => {
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

    if (loading) return <LoadingSpinner fullScreen />;
    if (!product) return <div className="container-custom py-12"><p>Product not found</p></div>;

    const inWishlist = isInWishlist(product._id);

    return (
        <div className="bg-white">
            <div className="container-custom py-12">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm">
                    <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gold-600">Home</button>
                    <span className="mx-2 text-gray-400">/</span>
                    <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-gold-600">Products</button>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                            <img
                                src={product.images[selectedImage] || product.images[0]}
                                alt={product.name}
                                className="w-full h-[36rem] object-cover"
                            />
                        </div>
                        <div
                            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#D4AF37 #f3f4f6'
                            }}
                        >
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-gold-600 scale-105' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-24 h-24 object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {product.category && (
                            <p className="text-gold-600 font-semibold uppercase tracking-wide text-sm mb-2">
                                {product.category.name}
                            </p>
                        )}

                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                            ? 'fill-gold-500 text-gold-500'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600">({product.reviewCount || 0} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-luxury-dark">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-xl text-gray-500 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        {/* Specifications */}
                        {product.material || product.weight?.value ? (
                            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold mb-3">Specifications</h2>
                                <div className="space-y-2 text-sm">
                                    {product.material && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Material:</span>
                                            <span className="font-medium">{product.material}</span>
                                        </div>
                                    )}
                                    {product.weight?.value && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Weight:</span>
                                            <span className="font-medium">{product.weight.value} {product.weight.unit}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stockQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    className="w-20 text-center input-field"
                                />
                                <button
                                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                                >
                                    +
                                </button>
                                <span className="text-gray-600 text-sm">
                                    ({product.stockQuantity} available)
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stockQuantity === 0}
                                className="flex-1 btn-primary flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                disabled={wishlistLoading}
                                className={`btn-outline px-6 ${inWishlist ? 'bg-gold-600 text-white border-gold-600' : ''}`}
                            >
                                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <Truck className="w-6 h-6 text-gold-600" />
                                <div className="text-sm">
                                    <p className="font-semibold">Free Shipping</p>
                                    <p className="text-gray-600">On orders above ₹5,000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-gold-600" />
                                <div className="text-sm">
                                    <p className="font-semibold">Certified Quality</p>
                                    <p className="text-gray-600">100% Authentic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 space-y-8">
                    <h2 className="text-3xl font-display font-bold">Reviews & Ratings</h2>

                    {/* Review Form */}
                    <ReviewForm
                        productId={id}
                        onReviewSubmitted={() => {
                            fetchReviews();
                            fetchProduct(); // Refresh product to update rating
                        }}
                    />

                    {/* Existing Reviews */}
                    <ReviewSection reviews={reviews} loading={reviewsLoading} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
