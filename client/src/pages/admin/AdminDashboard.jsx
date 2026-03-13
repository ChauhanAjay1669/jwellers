import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axios';
import { Package, ShoppingBag, TrendingUp, Star, AlertCircle, Grid, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/admin/stats');
            setStats(response.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-luxury-dark text-white py-6">
                <div className="container-custom">
                    <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                    <p className="text-gold-300 mt-1 text-xl mt-2">Welcome back, {user.name}</p>
                </div>
            </div>

            <div className="container-custom py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loading-spinner"></div>
                    </div>
                ) : stats ? (
                    <>
                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Total Products */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Products</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.products.total}</p>
                                        <p className="text-xs text-green-600 mt-1">{stats.products.active} active</p>
                                    </div>
                                    <Package className="w-12 h-12 text-blue-600" />
                                </div>
                            </div>

                            {/* Total Categories */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Categories</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.categories.total}</p>
                                    </div>
                                    <Grid className="w-12 h-12 text-purple-600" />
                                </div>
                            </div>

                            {/* Total Orders */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Orders</p>
                                        <p className="text-3xl font-bold text-gray-900">{stats.orders.total}</p>
                                        <p className="text-xs text-orange-600 mt-1">{stats.orders.pending} pending</p>
                                    </div>
                                    <ShoppingBag className="w-12 h-12 text-orange-600" />
                                </div>
                            </div>

                            {/* Total Revenue */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Revenue</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            ₹{stats.revenue.total.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">{stats.orders.completed} completed</p>
                                    </div>
                                    <DollarSign className="w-12 h-12 text-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Secondary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-600 rounded-lg shadow-md p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-200">Featured Products</p>
                                        <p className="text-3xl font-bold text-gray-100">{stats.products.featured}</p>
                                    </div>
                                    <Star className="w-10 h-10 text-gray-100" />
                                </div>
                            </div>

                            <div className="bg-blue-500 rounded-lg shadow-md p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-100">Trending Products</p>
                                        <p className="text-3xl font-bold">{stats.products.trending}</p>
                                    </div>
                                    <TrendingUp className="w-10 h-10 text-blue-200" />
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-red-100">Low Stock Items</p>
                                        <p className="text-3xl font-bold">{stats.products.lowStock}</p>
                                    </div>
                                    <AlertCircle className="w-10 h-10 text-red-200" />
                                </div>
                            </div>
                        </div>

                        {/* Low Stock Alert */}
                        {stats.lowStockList && stats.lowStockList.length > 0 && (
                            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
                                <div className="flex items-start">
                                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-red-900 mb-3">Low Stock Alert</h3>
                                        <div className="space-y-2">
                                            {stats.lowStockList.map((product) => (
                                                <div key={product._id} className="flex justify-between items-center bg-white p-3 rounded">
                                                    <span className="font-medium text-gray-900">{product.name}</span>
                                                    <span className="text-sm">
                                                        <span className="text-red-600 font-bold">{product.stockQuantity} units</span>
                                                        <span className="text-gray-500 ml-2">• ₹{product.price.toLocaleString()}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6 text-luxury-dark">Quick Actions</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link to="/admin/products" className="btn-primary text-center">
                                    Manage Products
                                </Link>
                                <Link to="/admin/categories" className="btn-outline text-center">
                                    Manage Categories
                                </Link>
                                <Link to="/admin/orders" className="btn-outline text-center">
                                    View All Orders
                                </Link>
                                <Link to="/admin/products/new" className="btn-outline text-center">
                                    + Add New Product
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-gray-600">
                        Failed to load dashboard statistics
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
