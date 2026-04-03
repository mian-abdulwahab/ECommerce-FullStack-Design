import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

const ProductCardGrid = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 flex flex-col hover:shadow-md transition-shadow group relative h-full">
            {/* Product Image */}
            <div className="aspect-square w-full mb-3 md:mb-4 flex items-center justify-center overflow-hidden bg-white">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-3 md:pt-4 mt-auto">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-base md:text-lg font-bold text-gray-900">USD {product.price}</span>
                            {product.oldPrice && (
                                <span className="text-xs md:text-sm text-gray-400 line-through">USD {product.oldPrice}</span>
                            )}
                        </div>
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < Math.floor(product.rating || 4) ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                            <span className="text-orange-400 text-[10px] md:text-xs font-bold ml-1">{product.rating || '4.0'}</span>
                        </div>
                    </div>
                    <button onClick={(e) => {e.preventDefault();}} className="p-1.5 md:p-2 bg-white border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors shadow-sm active:scale-90">
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>

                <h3 className="text-xs md:text-sm text-gray-600 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight line-clamp-2">
                    {product.name}
                </h3>
            </div>
        </Link>
    );
};

export default ProductCardGrid;
