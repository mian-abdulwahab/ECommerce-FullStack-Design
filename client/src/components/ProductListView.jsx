import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import ProductCardList from './ProductCardList';
import ProductCardGrid from './ProductCardGrid';

const ProductListView = ({ products, count, title }) => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [viewMode, setViewMode] = useState('grid');

    const updateFilters = (newParams) => {
        const params = new URLSearchParams(search);
        Object.keys(newParams).forEach(key => {
            if (newParams[key] === null) {
                params.delete(key);
            } else {
                params.set(key, newParams[key]);
            }
        });
        navigate(`/products?${params.toString()}`);
    };

    return (
        <div className="flex-1">
            {/* Top Header Bar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-sm text-gray-600 mb-4 md:mb-0">
                    <span className="font-bold text-gray-900">{count}</span> items in <span className="font-bold text-gray-900 capitalize">{title || "All items"}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={queryParams.get('isFeatured') === 'true'}
                            onChange={(e) => updateFilters({ isFeatured: e.target.checked ? 'true' : null })}
                            className="w-4 h-4 border-gray-300 text-blue-600 rounded focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700">Verified only</span>
                    </label>
                    <div className="relative">
                        <select 
                            value={queryParams.get('sort') || 'featured'}
                            onChange={(e) => updateFilters({ sort: e.target.value })}
                            className="bg-white border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-700 outline-none font-medium appearance-none pr-8 cursor-pointer"
                        >
                            <option value="featured">Featured</option>
                            <option value="newest">Newest items</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                    <div className="flex border border-gray-200 rounded overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                        >
                            <LayoutGrid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-gray-900' : 'text-gray-500'}`} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                        >
                            <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-gray-900' : 'text-gray-500'}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(queryParams.size > 0 && !(queryParams.size === 1 && queryParams.has('search'))) && (
                <div className="flex flex-wrap items-center gap-2 mb-6 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                    <span className="text-xs font-bold text-gray-500 mr-1 uppercase tracking-wider">Active filters:</span>
                    {Array.from(queryParams.entries()).map(([key, value]) => {
                        if (key === 'search') return null;
                        return (
                            <div key={key} className="flex items-center bg-white border border-blue-200 px-2 py-1 rounded-md text-xs text-blue-700 font-medium group">
                                <span className="capitalize">{key.replace('isFeatured', 'Verified')}: {value}</span>
                                <button 
                                    onClick={() => updateFilters({ [key]: null })}
                                    className="ml-2 hover:text-red-500 transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        );
                    })}
                    <button
                        onClick={() => navigate('/products')}
                        className="text-blue-600 text-xs font-bold hover:underline ml-auto"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Content */}
            {products.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-20 flex flex-col items-center justify-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 max-w-xs">We couldn't find any items matching your criteria. Try adjusting your search or filters.</p>
                </div>
            ) : viewMode === 'list' ? (
                <div className="space-y-4">
                    {products.map((product, index) => (
                        <ProductCardList key={index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {products.map((product, index) => (
                        <ProductCardGrid key={index} product={product} />
                    ))}
                </div>
            )}

            {/* Pagination UI (Functional placeholder) */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                    <select className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 outline-none font-medium appearance-none pr-8 min-w-[100px]">
                        <option>Show 10</option>
                        <option>Show 20</option>
                    </select>
                    <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                </div>
                <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden shadow-sm">
                    <button className="p-2.5 border-r border-gray-200 hover:bg-gray-50 text-gray-400 disabled:opacity-50">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-900 font-bold border-r border-gray-200">1</button>
                    <button className="p-2.5 hover:bg-gray-50 text-gray-600">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductListView;
