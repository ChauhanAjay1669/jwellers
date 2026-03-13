import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ProductForm from './pages/admin/ProductForm';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/products" element={<ProductsPage />} />
                                    <Route path="/products/:id" element={<ProductDetailPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                    <Route path="/orders" element={<OrdersPage />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/shipping" element={<ShippingPage />} />
                                    <Route path="/returns" element={<ReturnsPage />} />
                                    <Route path="/faq" element={<FAQPage />} />
                                    <Route path="/terms" element={<TermsPage />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />

                                    {/* Admin Routes */}
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/admin/products" element={<ManageProducts />} />
                                    <Route path="/admin/products/new" element={<ProductForm />} />
                                    <Route path="/admin/products/edit/:id" element={<ProductForm />} />
                                    <Route path="/admin/categories" element={<ManageCategories />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </WishlistProvider>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
