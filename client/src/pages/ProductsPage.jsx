import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { SlidersHorizontal } from 'lucide-react';

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sortBy: 'createdAt',
        order: 'desc',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filters, searchParams]);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data.categories);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = {
                ...filters,
                isFeatured: searchParams.get('isFeatured'),
                isTrending: searchParams.get('isTrending'),
            };

            const response = await productAPI.getAll(params);
            setProducts(response.data.products);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        if (key === 'sortBy') {
            // Handle sort direction prefix (e.g., "-price" for descending)
            if (value.startsWith('-')) {
                setFilters(prev => ({
                    ...prev,
                    sortBy: value.substring(1), // Remove the "-" prefix
                    order: 'desc'
                }));
            } else {
                setFilters(prev => ({
                    ...prev,
                    sortBy: value,
                    order: 'asc'
                }));
            }
        } else {
            setFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold text-gray-900">
                        {searchParams.get('isFeatured') ? 'Featured Products' :
                            searchParams.get('isTrending') ? 'Trending Products' :
                                'All Products'}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal className="w-5 h-5 text-gold-600" />
                                <h2 className="text-lg font-semibold">Filters</h2>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="input-field text-sm py-2"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="input-field text-sm py-2"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                                <select
                                    value={filters.order === 'desc' ? `-${filters.sortBy}` : filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="input-field"
                                >
                                    <option value="-createdAt">Newest First</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                    <option value="name">Name: A-Z</option>
                                    <option value="-name">Name: Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <LoadingSpinner />
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No products found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        imageClasses="rounded-lg w-full group-hover:shadow-xl hover:-translate-y-0.5 duration-300 transition-all h-72 object-cover object-right"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
