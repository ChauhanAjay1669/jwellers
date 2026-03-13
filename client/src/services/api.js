import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
};

// Product APIs
export const productAPI = {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    uploadImages: (id, formData) =>
        api.post(`/products/${id}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
};

// Category APIs
export const categoryAPI = {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
};

// Cart APIs
export const cartAPI = {
    get: () => api.get('/cart'),
    add: (productId, quantity) => api.post('/cart', { productId, quantity }),
    update: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
    remove: (itemId) => api.delete(`/cart/${itemId}`),
    clear: () => api.delete('/cart'),
};

// Order APIs
export const orderAPI = {
    create: (data) => api.post('/orders', data),
    getMyOrders: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`),
    getAllOrders: () => api.get('/orders/admin/all'),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { orderStatus: status }),
};

// Wishlist APIs
export const wishlistAPI = {
    get: () => api.get('/wishlist'),
    add: (productId) => api.post(`/wishlist/${productId}`),
    remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// Review APIs
export const reviewAPI = {
    getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),
    create: (data) => api.post('/reviews', data),
    update: (id, data) => api.put(`/reviews/${id}`, data),
    delete: (id) => api.delete(`/reviews/${id}`),
};

// User APIs
export const userAPI = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    uploadAvatar: (formData) =>
        api.post('/users/profile/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    addAddress: (data) => api.post('/users/addresses', data),
    updateAddress: (addressId, data) => api.put(`/users/addresses/${addressId}`, data),
    deleteAddress: (addressId) => api.delete(`/users/addresses/${addressId}`),
    getAllUsers: () => api.get('/users'),
};

export default api;
