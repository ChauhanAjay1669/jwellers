import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, loading, updateQuantity, removeItem } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) return <LoadingSpinner fullScreen />;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container-custom py-12 text-center">
                <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Add some beautiful jewelry to your cart!</p>
                <button onClick={() => navigate('/products')} className="btn-primary">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <h1 className="text-4xl font-display font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex gap-6">
                                    <img
                                        src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                                        alt={item.product?.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {item.product?.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {item.product?.material}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center disabled:opacity-50"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <p className="text-xl font-bold text-gray-900">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(cart.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax (18%)</span>
                                    <span>{formatPrice(cart.totalAmount * 0.18)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span>{cart.totalAmount > 5000 ? 'FREE' : formatPrice(100)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="text-gold-600">
                                        {formatPrice(
                                            cart.totalAmount +
                                            cart.totalAmount * 0.18 +
                                            (cart.totalAmount > 5000 ? 0 : 100)
                                        )}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full btn-primary mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate('/products')}
                                className="w-full btn-outline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
