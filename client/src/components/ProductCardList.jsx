import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

const ProductCardList = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-md transition-shadow group relative">
            {/* Product Image */}
            <div className="w-full md:w-52 h-48 md:h-52 flex-shrink-0 flex items-center justify-center overflow-hidden bg-white rounded-md">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer pr-10 line-clamp-2 md:line-clamp-none">
                        {product.name}
                    </h3>
                    <button 
                        onClick={(e) => {e.preventDefault();}}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors shadow-sm active:scale-95"
                    >
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>

                <div className="flex items-center space-x-4 mt-2 mb-3">
                    <div className="flex items-center">
                        <span className="text-lg md:text-xl font-bold text-gray-900">USD {product.price}</span>
                        {product.oldPrice && (
                            <span className="text-xs md:text-sm text-gray-400 line-through ml-2">USD {product.oldPrice}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < Math.floor(product.rating || 4) ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-orange-400 font-bold ml-1">{product.rating || '4.0'}</span>
                    </div>
                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-blue-500">{product.reviews || 0} reviews</span>
                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-green-600 font-medium">Free Shipping</span>
                </div>

                <p className="hidden md:block text-gray-500 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2 italic">
                    {product.description || "Premium quality product from verified supplier. Fast delivery and secure payments."}
                </p>

                <span className="text-blue-600 font-bold text-sm hover:underline">
                    View details
                </span>
            </div>
        </Link>
    );
};

export default ProductCardList;
