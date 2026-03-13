import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../../services/api';
import { ArrowLeft, Upload, X, Save, AlertCircle } from 'lucide-react';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        material: '',
        weight: { value: '', unit: 'grams' },
        stockQuantity: '',
        isFeatured: false,
        isTrending: false,
        tags: '',
        images: []
    });

    const [categories, setCategories] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Category Modal State
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState({ name: '', description: '', image: '' });
    const [categoryLoading, setCategoryLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data.categories);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getById(id);
            const product = response.data.product;

            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                originalPrice: product.originalPrice || '',
                category: product.category._id || product.category,
                material: product.material || '',
                weight: product.weight || { value: '', unit: 'grams' },
                stockQuantity: product.stockQuantity,
                isFeatured: product.isFeatured,
                isTrending: product.isTrending,
                tags: product.tags.join(', '),
                images: product.images
            });
            setPreviewImages(product.images);
        } catch (err) {
            setError('Failed to fetch product details');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const handleAddImageUrl = () => {
        if (!imageUrlInput) return;

        // Add to preview images (which are also used as the source of truth for existing URLs)
        setPreviewImages(prev => [...prev, imageUrlInput]);

        // Add to formData.images so it gets sent to backend
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrlInput]
        }));

        setImageUrlInput('');
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));

        // Check if it's a file or a URL
        const imageToRemove = previewImages[index];

        if (imageToRemove && imageToRemove.startsWith('blob:')) {
            // It's a file - find which file it corresponds to
            // This is tricky without mapping, but let's assume order is preserved relative to files array

            // CORRECT APPROACH for this form:
            // We have `formData.images` (URLs) and `imageFiles` (Files).
            // `previewImages` is a mix.

            // If we remove an image, we need to know if it was from `formData.images` or `imageFiles`.

            if (index < formData.images.length) {
                // It was an existing URL
                const newImages = [...formData.images];
                newImages.splice(index, 1);
                setFormData(prev => ({ ...prev, images: newImages }));
            } else {
                // It was a new file
                const fileIndex = index - formData.images.length;
                setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
            }
        } else {
            // It's a URL (either existing or newly added via link)
            // If it's in formData.images, remove it
            const urlIndex = formData.images.indexOf(imageToRemove);
            if (urlIndex > -1) {
                const newImages = [...formData.images];
                newImages.splice(urlIndex, 1);
                setFormData(prev => ({ ...prev, images: newImages }));
            }
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setCategoryLoading(true);
        try {
            const response = await categoryAPI.create(newCategoryData);
            const newCategory = response.data.category;

            // Add to categories list
            setCategories(prev => [...prev, newCategory]);

            // Select the new category
            setFormData(prev => ({ ...prev, category: newCategory._id }));

            // Close modal and reset
            setShowCategoryModal(false);
            setNewCategoryData({ name: '', description: '', image: '' });
        } catch (err) {
            console.error('Error creating category:', err);
            alert('Failed to create category');
        } finally {
            setCategoryLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const productData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
            };

            let productId = id;

            if (isEditMode) {
                await productAPI.update(id, productData);
            } else {
                const response = await productAPI.create(productData);
                productId = response.data.product._id;
            }

            // Upload images if any
            if (imageFiles.length > 0) {
                const formData = new FormData();
                imageFiles.forEach(file => {
                    formData.append('images', file);
                });
                await productAPI.uploadImages(productId, formData);
            }

            navigate('/admin/products');
        } catch (err) {
            console.error('Error saving product:', err);
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <div className="bg-white shadow-sm border-b">
                <div className="container-custom py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/admin/products')} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? 'Edit Product' : 'Add New Product'}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="e.g. Diamond Solitaire Ring"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="input-field"
                                        placeholder="Detailed product description..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (Optional)</label>
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        min="0"
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="e.g. 18K Gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="weight.value"
                                            value={formData.weight.value}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Value"
                                        />
                                        <select
                                            name="weight.unit"
                                            value={formData.weight.unit}
                                            onChange={handleChange}
                                            className="input-field w-24"
                                        >
                                            <option value="grams">grams</option>
                                            <option value="carats">carats</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Organization</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <div className="flex gap-2">
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="input-field flex-1"
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(cat => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setShowCategoryModal(true)}
                                            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                            title="Add New Category"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="comma, separated, tags"
                                    />
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isFeatured"
                                            checked={formData.isFeatured}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-gold-600 rounded border-gray-300 focus:ring-gold-500"
                                        />
                                        <span className="text-sm text-gray-700">Featured Product</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isTrending"
                                            checked={formData.isTrending}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-gold-600 rounded border-gray-300 focus:ring-gold-500"
                                        />
                                        <span className="text-sm text-gray-700">Trending Product</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Images</h2>

                            <div className="space-y-4">
                                {/* Image URL Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        value={imageUrlInput}
                                        onChange={(e) => setImageUrlInput(e.target.value)}
                                        placeholder="Paste image URL here..."
                                        className="input-field flex-1 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImageUrl}
                                        className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium"
                                    >
                                        Add
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    {previewImages.map((src, index) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group">
                                            <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gold-500 cursor-pointer transition-colors">
                                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <span className="text-sm text-gray-600">Click to upload images</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Quick Add Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-900">Add New Category</h3>
                        </div>
                        <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategoryData.name}
                                    onChange={(e) => setNewCategoryData({ ...newCategoryData, name: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g. Earrings"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newCategoryData.description}
                                    onChange={(e) => setNewCategoryData({ ...newCategoryData, description: e.target.value })}
                                    className="input-field"
                                    rows="2"
                                    placeholder="Optional description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={newCategoryData.image}
                                    onChange={(e) => setNewCategoryData({ ...newCategoryData, image: e.target.value })}
                                    className="input-field"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryLoading}
                                    className="btn-primary px-4 py-2"
                                >
                                    {categoryLoading ? 'Creating...' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
