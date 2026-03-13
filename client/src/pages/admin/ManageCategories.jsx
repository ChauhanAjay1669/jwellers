import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

const ManageCategories = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        description: '',
        image: '',
        isActive: true
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/categories/admin/all');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle delete category
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await axios.delete(`/categories/${id}`);
            alert('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert(error.response?.data?.message || 'Failed to delete category');
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedCategories.length === 0) {
            alert('Please select categories to delete');
            return;
        }

        if (!confirm(`Are you sure you want to delete ${selectedCategories.length} categories?`)) return;

        try {
            await axios.post('/admin/categories/bulk-delete', { categoryIds: selectedCategories });
            alert('Categories deleted successfully');
            setSelectedCategories([]);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting categories:', error);
            alert(error.response?.data?.message || 'Failed to delete categories');
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`/categories/${formData._id}`, {
                    name: formData.name,
                    description: formData.description,
                    image: formData.image,
                    isActive: formData.isActive
                });
                alert('Category updated successfully');
            } else {
                await axios.post('/categories', {
                    name: formData.name,
                    description: formData.description,
                    image: formData.image,
                    isActive: formData.isActive
                });
                alert('Category created successfully');
            }
            setShowForm(false);
            setFormData({ _id: '', name: '', description: '', image: '', isActive: true });
            setIsEditing(false);
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            alert(error.response?.data?.message || 'Failed to save category');
        }
    };

    // Handle edit
    const handleEdit = (category) => {
        setFormData({
            _id: category._id,
            name: category.name,
            description: category.description || '',
            image: category.image || '',
            isActive: category.isActive
        });
        setIsEditing(true);
        setShowForm(true);
    };

    // Export to CSV
    const handleExport = async () => {
        try {
            const response = await axios.get('/admin/export/categories', {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'categories.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting categories:', error);
            alert('Failed to export categories');
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
                    Manage Categories
                </h1>
                <div className="flex gap-3">
                    <button onClick={handleExport} className="btn-outline px-4 py-2">
                        Export CSV
                    </button>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setIsEditing(false);
                            setFormData({ _id: '', name: '', description: '', image: '', isActive: true });
                        }}
                        className="btn-primary px-4 py-2"
                    >
                        + Add Category
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-display font-bold text-luxury-dark">
                                {isEditing ? 'Edit Category' : 'Add New Category'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Rings, Necklaces"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="input-field"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of the category"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    className="input-field"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                />
                                {formData.image && (
                                    <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
                                )}
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                                    Active
                                </label>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary px-6 py-2">
                                    {isEditing ? 'Update' : 'Create'} Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Bulk Actions */}
            {selectedCategories.length > 0 && (
                <div className="bg-gold-100 border border-gold-300 rounded-lg p-4 mb-6 flex justify-between items-center">
                    <span className="text-gold-800 font-semibold">
                        {selectedCategories.length} category(s) selected
                    </span>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Delete Selected
                    </button>
                </div>
            )}

            {/* Categories Grid */}
            <div className="bg-white rounded-xl shadow-md p-6">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="loading-spinner mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading categories...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-luxury-dark">{category.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{category.productCount || 0} products</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCategories([...selectedCategories, category._id]);
                                                } else {
                                                    setSelectedCategories(selectedCategories.filter(id => id !== category._id));
                                                }
                                            }}
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    {category.description && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className={`px-2 py-1 rounded text-xs ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {category.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && categories.length === 0 && (
                    <div className="p-8 text-center text-gray-600">
                        No categories found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageCategories;
