import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Package, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { authAPI } from '../services/api';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleProfileUpdate = (updatedUser) => {
        setCurrentUser(updatedUser);
    };

    const quickLinks = [
        { icon: Package, label: 'My Orders', path: '/orders', color: 'bg-blue-100 text-blue-600' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist', color: 'bg-red-100 text-red-600' },
        { icon: ShoppingBag, label: 'Cart', path: '/cart', color: 'bg-green-100 text-green-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container-custom max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your account and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Info Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Profile Header with Gradient */}
                            <div className="bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

                                <div className="relative flex items-center gap-6">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden">
                                        {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                                            <img
                                                src={currentUser.avatar.startsWith('http') ? currentUser.avatar : `http://localhost:5000${currentUser.avatar}`}
                                                alt={currentUser.name}
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-gold-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-1">{currentUser.name}</h2>
                                        <p className="text-gold-100 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            {currentUser.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Full Name
                                        </label>
                                        <p className="text-xl font-semibold text-gray-900">{currentUser.name}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <p className="text-xl font-semibold text-gray-900">{currentUser.email}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Account Role
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-gold-600" />
                                            <span className="text-xl font-semibold text-gray-900 capitalize">
                                                {currentUser.role}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Member Since
                                        </label>
                                        <p className="text-xl font-semibold text-gray-900">
                                            {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-6 border-t">
                                    <button
                                        onClick={() => setIsEditModalOpen(true)}
                                        className="btn-primary flex-1"
                                    >
                                        Edit Profile
                                    </button>
                                    <button className="btn-outline flex-1">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                {quickLinks.map((link) => (
                                    <button
                                        key={link.path}
                                        onClick={() => navigate(link.path)}
                                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <link.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            {link.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Admin Link */}
                        {currentUser.role === 'admin' && (
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">Admin Access</h3>
                                <p className="text-purple-100 text-sm mb-4">
                                    Manage products, orders, and users
                                </p>
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="w-full bg-white text-purple-600 font-semibold py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors"
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center gap-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout from Account
                        </button>
                    </div>
                </div>

                {/* Edit Profile Modal */}
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    user={currentUser}
                    onUpdate={handleProfileUpdate}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
