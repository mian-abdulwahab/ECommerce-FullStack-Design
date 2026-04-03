import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Check, Star, MessageSquare, ShoppingBag, Heart } from 'lucide-react';

const ProductDetailsInfo = ({ product }) => {
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        addToCart(product._id, qty);
    };

    return (
        <div className="flex-1">
            <div className="flex items-center text-green-600 text-sm font-medium mb-2">
                <Check className="w-4 h-4 mr-1" />
                <span>In stock</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
            </h1>

            <div className="flex items-center space-x-4 text-sm mb-6">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4) ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-orange-400 font-bold ml-1">{product.rating || '4.5'}</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center text-gray-500">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>{product.reviews || '32'} reviews</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center text-gray-500">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    <span>{product.sold || '154'} sold</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-y border-gray-100 py-4 bg-orange-50/30 mb-6">
                <div className="p-4 border-r border-gray-100 last:border-r-0">
                    <p className="text-red-500 font-bold text-xl">USD {product.price}</p>
                    <p className="text-xs text-gray-400 mt-1">1-10 pcs</p>
                </div>
                <div className="p-4 border-r border-gray-100 last:border-r-0">
                    <p className="text-gray-900 font-bold text-xl">USD {(product.price * 0.9).toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-1">10-50 pcs</p>
                </div>
                <div className="p-4 border-r border-gray-100 last:border-r-0">
                    <p className="text-gray-900 font-bold text-xl">USD {(product.price * 0.8).toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-1">50+ pcs</p>
                </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden h-10">
                    <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="px-3 hover:bg-gray-100 transition-colors border-r border-gray-200 text-gray-600 font-bold"
                    >
                        -
                    </button>
                    <input 
                        type="number" 
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                        className="w-12 text-center outline-none bg-white text-gray-800 font-medium"
                    />
                    <button 
                        onClick={() => setQty(qty + 1)}
                        className="px-3 hover:bg-gray-100 transition-colors border-l border-gray-200 text-gray-600 font-bold"
                    >
                        +
                    </button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 min-w-[150px] bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-all shadow-md active:scale-95 text-center flex items-center justify-center space-x-2"
                >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to cart</span>
                </button>
                
                <button className="p-2 border border-gray-200 rounded-md text-blue-600 hover:bg-gray-50 transition-colors shadow-sm">
                    <Heart className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                {[
                    { label: "Category", value: product.category, isBlue: true },
                    { label: "Stock", value: `${product.stock} units`, isBlue: false },
                    { label: "Protection", value: "Refund Policy", isBlue: false },
                    { label: "Warranty", value: "2 years full warranty", isBlue: false },
                ].map((item, i) => (
                    <div key={i} className="flex border-b border-gray-100 pb-2">
                        <span className="text-gray-400 text-sm w-32">{item.label}:</span>
                        <span className={`text-sm font-medium ${item.isBlue ? 'text-blue-600' : 'text-gray-600'}`}>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetailsInfo;
