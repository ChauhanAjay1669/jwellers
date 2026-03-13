import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Mail, PhoneCallIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-luxury-dark text-gold-400 py-2">
                <div className="container-custom flex justify-between items-center text-sm">
                    <p>Free Shipping on Orders Above ₹5,000</p>
                    <div className="hidden md:flex gap-4">
                        <a href="tel:+919876543210" className="hover:text-gold-300"><PhoneCallIcon className=" text-gold-600 inline-block w-4 h-4 mr-1" /> +91 98765-43210</a>
                        <a href="mailto:support@jwellers.com" className="hover:text-gold-300"> <span><Mail className=" text-gold-600 inline-block w-4 h-4 mr-1" />ajaysjwellers@gmail.com </span></a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">J</span>
                        </div>
                        <span className="text-2xl font-display font-bold text-luxury-dark font-italic">
                            Ajay's Jwellers
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link to="/" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                            Products
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/products?isFeatured=true" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                            Featured
                        </Link>
                        <Link to="/products?isTrending=true" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">
                            Trending
                        </Link>
                        {isAuthenticated && user?.role === 'admin' && (
                            <Link to="/admin" className="text-gold-600 hover:text-gold-700 font-medium transition-colors">
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Wishlist */}
                        {isAuthenticated && (
                            <Link
                                to="/wishlist"
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                            >
                                <Heart className="w-5 h-5 text-gray-700" />
                            </Link>
                        )}

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        <div className="relative group">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <User className="w-5 h-5 text-gray-700" />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {isAuthenticated ? (
                                    <>
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {showSearch && (
                    <div className="mt-4 animate-slide-up">
                        <input
                            type="text"
                            placeholder="Search for jewelry..."
                            className="input-field"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t animate-slide-up">
                    <div className="container-custom py-4 flex flex-col gap-3">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gold-600 font-medium py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-gold-600 font-medium py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-gold-600 font-medium py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/products?isFeatured=true"
                            className="text-gray-700 hover:text-gold-600 font-medium py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Featured
                        </Link>
                        <Link
                            to="/products?isTrending=true"
                            className="text-gray-700 hover:text-gold-600 font-medium py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Trending
                        </Link>
                        {isAuthenticated && user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="text-gold-600 hover:text-gold-700 font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
