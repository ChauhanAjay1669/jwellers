import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            setWishlist([]);
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchWishlist = async () => {
        try {
            const response = await wishlistAPI.get();
            setWishlist(response.data.wishlist.products || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        if (!isAuthenticated) {
            alert('Please login to add items to wishlist');
            return;
        }

        try {
            const response = await wishlistAPI.add(productId);
            setWishlist(response.data.wishlist.products || []);
            return { success: true };
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' };
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const response = await wishlistAPI.remove(productId);
            setWishlist(response.data.wishlist.products || []);
            return { success: true };
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            return { success: false, message: error.response?.data?.message || 'Failed to remove from wishlist' };
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    const value = {
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist: fetchWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
