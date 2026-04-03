import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

const FilterSidebar = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    
    const [minPrice, setMinPrice] = useState(queryParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(queryParams.get('maxPrice') || '');

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

    const handlePriceApply = () => {
        updateFilters({
            minPrice: minPrice || null,
            maxPrice: maxPrice || null
        });
    };

    const categories = [
        { name: "Electronics", slug: "consumer electronics and gadgets" },
        { name: "Clothes", slug: "clothing and apparel" },
        { name: "Home & Garden", slug: "home and outdoor" },
        { name: "Tools", slug: "machinery and tools" }
    ];

    return (
        <div className="w-64 flex-shrink-0 space-y-4">
            {/* Category Section */}
            <div className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between mb-3 cursor-pointer group">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase text-xs tracking-wider">Category</h4>
                    <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </div>
                <ul className="space-y-2">
                    {categories.map((cat, i) => (
                        <li 
                            key={i} 
                            onClick={() => updateFilters({ category: cat.slug })}
                            className={`text-sm cursor-pointer transition-colors ${queryParams.get('category') === cat.slug ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600'}`}
                        >
                            {cat.name}
                        </li>
                    ))}
                    <li 
                        onClick={() => updateFilters({ category: null })}
                        className="text-sm text-blue-600 cursor-pointer font-medium pt-1 hover:underline"
                    >
                        Clear Category
                    </li>
                </ul>
            </div>

            {/* Brands (Static for UI matching) */}
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3 cursor-pointer group">
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Brands</h4>
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                    {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((item, i) => (
                        <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-600 group-hover:text-blue-600">{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3 cursor-pointer group">
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Price range</h4>
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-4">
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Min</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm outline-none bg-white font-medium" 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 block">Max</label>
                            <input 
                                type="number" 
                                placeholder="999999" 
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm outline-none bg-white font-medium" 
                            />
                        </div>
                    </div>
                    <button 
                        onClick={handlePriceApply}
                        className="w-full bg-white border border-gray-200 text-blue-600 font-bold py-2 rounded shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-sm active:scale-95"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Ratings */}
            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3 cursor-pointer group">
                    <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Ratings</h4>
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                    {[5, 4, 3, 2].map((stars) => (
                        <label key={stars} className="flex items-center space-x-3 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="rating"
                                checked={queryParams.get('rating') === stars.toString()}
                                onChange={() => updateFilters({ rating: stars })}
                                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" 
                            />
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < stars ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </label>
                    ))}
                    <button 
                        onClick={() => updateFilters({ rating: null })}
                        className="text-xs text-blue-600 font-medium hover:underline pt-1"
                    >
                        Reset Rating
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
