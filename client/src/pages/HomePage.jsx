import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, HeadphonesIcon } from 'lucide-react';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [featured, trending, cats] = await Promise.all([
                productAPI.getAll({ isFeatured: true, limit: 4 }),
                productAPI.getAll({ isTrending: true, limit: 4 }),
                categoryAPI.getAll(),
            ]);

            setFeaturedProducts(featured.data.products);
            setTrendingProducts(trending.data.products);
            setCategories(cats.data.categories);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] bg-gradient-to-r from-luxury-dark via-luxury-charcoal to-luxury-dark overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920')] bg-cover bg-center opacity-20"></div>

                <div className="relative container-custom h-full flex items-center">
                    <div className="max-w-2xl text-white animate-slide-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                            Timeless Elegance in Every Piece
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-gray-200">
                            Discover our exquisite collection of handcrafted jewelry
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/products" className="btn-primary">
                                Shop Now
                                <ArrowRight className="w-5 h-5 ml-2 inline" />
                            </Link>
                            <Link to="/products?isFeatured=true" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-luxury-dark">
                                View Featured
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Section */}
            <section className="py-16 bg-luxury-cream overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Explore our diverse collections</p>
                    </div>
                </div>

                <div className="w-full relative pause-on-hover">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-luxury-cream to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-cream to-transparent z-10 pointer-events-none"></div>

                    <div className="flex gap-8 animate-scroll whitespace-nowrap py-4 pl-4">
                        {[...categories, ...categories, ...categories].map((category, index) => (
                            <Link
                                key={`${category._id}-${index}`}
                                to={`/products?category=${category._id}`}
                                className="group text-center inline-block w-48 flex-shrink-0"
                            >
                                <div className="w-40 h-40 mx-auto bg-white rounded-full shadow-md overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-gold group-hover:scale-105 border-4 border-white">
                                    <img
                                        src={category.image || `https://via.placeholder.com/200x200?text=${category.name}`}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="section-title">Featured Collection</h2>
                            <p className="section-subtitle">Handpicked pieces just for you</p>
                        </div>
                        <Link to="/products?isFeatured=true" className="btn-outline hidden md:flex items-center gap-2">
                            View All
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="text-center md:hidden">
                        <Link to="/products?isFeatured=true" className="btn-outline inline-flex items-center gap-2">
                            View All Featured
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-16 bg-gradient-to-br from-gold-50 to-gold-100">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="section-title">Trending Now</h2>
                            <p className="section-subtitle">The most popular choices</p>
                        </div>
                        <Link to="/products?isTrending=true" className="btn-outline hidden md:flex items-center gap-2">
                            View All
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {trendingProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="text-center md:hidden">
                        <Link to="/products?isTrending=true" className="btn-outline inline-flex items-center gap-2">
                            View All Trending
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-luxury-dark text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-gray-300">On all orders above ₹5,000</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Certified Quality</h3>
                            <p className="text-gray-300">100% authentic jewelry with certification</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HeadphonesIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                            <p className="text-gray-300">Dedicated customer service team</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
