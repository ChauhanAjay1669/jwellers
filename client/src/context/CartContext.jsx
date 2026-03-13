import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await cartAPI.get();
            setCart(response.data.cart);
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await cartAPI.add(productId, quantity);
            setCart(response.data.cart);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to add to cart';
            return { success: false, error: message };
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const response = await cartAPI.update(itemId, quantity);
            setCart(response.data.cart);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update quantity';
            return { success: false, error: message };
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await cartAPI.remove(itemId);
            setCart(response.data.cart);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to remove item';
            return { success: false, error: message };
        }
    };

    const clearCart = async () => {
        try {
            const response = await cartAPI.clear();
            setCart(response.data.cart);
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to clear cart';
            return { success: false, error: message };
        }
    };

    const getItemCount = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart,
        itemCount: getItemCount(),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
