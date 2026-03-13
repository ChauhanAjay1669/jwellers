import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

const ManageProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        isFeatured: '',
        isTrending: '',
        isActive: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 0
    });

    // Fetch all products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.page,
                limit: pagination.limit,
                ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
            });

            const response = await axios.get(`/products/admin/all?${params}`);
            setProducts(response.data.products);
            setPagination(prev => ({
                ...prev,
                total: response.data.total,
                pages: response.data.pages
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [pagination.page, filters]);

    // Handle delete product
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`/products/${id}`);
            alert('Product deleted successfully');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedProducts.length === 0) {
            alert('Please select products to delete');
            return;
        }

        if (!confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) return;

        try {
            await axios.post('/admin/products/bulk-delete', { productIds: selectedProducts });
            alert('Products deleted successfully');
            setSelectedProducts([]);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting products:', error);
            alert('Failed to delete products');
        }
    };

    // Handle toggle status
    const handleToggleStatus = async (id, field, currentValue) => {
        try {
            await axios.patch(`/admin/products/${id}/toggle`, {
                field,
                value: !currentValue
            });
            fetchProducts();
        } catch (error) {
            console.error('Error updating product status:', error);
            alert('Failed to update product status');
        }
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p._id));
        } else {
            setSelectedProducts([]);
        }
    };

    // Handle select product
    const handleSelectProduct = (id) => {
        setSelectedProducts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    // Export to CSV
    const handleExport = async () => {
        try {
            const response = await axios.get('/admin/export/products', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'products.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting products:', error);
            alert('Failed to export products');
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
                <p className="text-gray-600 mt-4">You don't have permission to access this page.</p>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-display font-bold text-luxury-dark">
                    Manage Products
                </h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="btn-outline px-4 py-2"
                    >
                        Export CSV
                    </button>
                    <Link to="/admin/products/new" className="btn-primary px-4 py-2">
                        + Add Product
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="input-field"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                    <select
                        className="input-field"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        className="input-field"
                        value={filters.isFeatured}
                        onChange={(e) => setFilters({ ...filters, isFeatured: e.target.value })}
                    >
                        <option value="">All (Featured)</option>
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                    </select>
                    <select
                        className="input-field"
                        value={filters.isTrending}
                        onChange={(e) => setFilters({ ...filters, isTrending: e.target.value })}
                    >
                        <option value="">All (Trending)</option>
                        <option value="true">Trending</option>
                        <option value="false">Not Trending</option>
                    </select>
                    <select
                        className="input-field"
                        value={filters.isActive}
                        onChange={(e) => setFilters({ ...filters, isActive: e.target.value })}
                    >
                        <option value="">All (Status)</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
                <div className="bg-gold-100 border border-gold-300 rounded-lg p-4 mb-6 flex justify-between items-center">
                    <span className="text-gold-800 font-semibold">
                        {selectedProducts.length} product(s) selected
                    </span>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Delete Selected
                    </button>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="loading-spinner mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-luxury-cream border-b">
                                <tr>
                                    <th className="p-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.length === products.length && products.length > 0}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4"
                                        />
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-luxury-dark">Image</th>
                                    <th className="p-4 text-left text-sm font-semibold text-luxury-dark">Name</th>
                                    <th className="p-4 text-left text-sm font-semibold text-luxury-dark">Category</th>
                                    <th className="p-4 text-left text-sm font-semibold text-luxury-dark">Price</th>
                                    <th className="p-4 text-left text-sm font-semibold text-luxury-dark">Stock</th>
                                    <th className="p-4 text-center text-sm font-semibold text-luxury-dark">Featured</th>
                                    <th className="p-4 text-center text-sm font-semibold text-luxury-dark">Trending</th>
                                    <th className="p-4 text-center text-sm font-semibold text-luxury-dark">Active</th>
                                    <th className="p-4 text-center text-sm font-semibold text-luxury-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product._id)}
                                                onChange={() => handleSelectProduct(product._id)}
                                                className="w-4 h-4"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <img
                                                src={product.images[0] || 'https://via.placeholder.com/60'}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="p-4 text-gray-600">{product.category?.name || 'N/A'}</td>
                                        <td className="p-4 text-gray-900">₹{product.price.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-sm ${product.stockQuantity < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {product.stockQuantity}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(product._id, 'isFeatured', product.isFeatured)}
                                                className={`px-3 py-1 rounded text-sm ${product.isFeatured ? 'bg-gold-200 text-gold-800' : 'bg-gray-200 text-gray-600'}`}
                                            >
                                                {product.isFeatured ? 'Yes' : 'No'}
                                            </button>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(product._id, 'isTrending', product.isTrending)}
                                                className={`px-3 py-1 rounded text-sm ${product.isTrending ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`}
                                            >
                                                {product.isTrending ? 'Yes' : 'No'}
                                            </button>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleToggleStatus(product._id, 'isActive', product.isActive)}
                                                className={`px-3 py-1 rounded text-sm ${product.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                                            >
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product._id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && products.length > 0 && (
                    <div className="p-4 border-t flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Showing {products.length} of {pagination.total} products
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {pagination.page} of {pagination.pages}
                            </span>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.pages}
                                className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="p-8 text-center text-gray-600">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
