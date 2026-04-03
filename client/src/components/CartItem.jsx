import { ChevronDown, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, addToCart } = useCart();
    const product = item.product;

    if (!product) return null;

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center py-6 border-b border-gray-100 last:border-b-0 space-y-4 md:space-y-0 group">
            {/* Product Image */}
            <div className="w-24 h-24 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center p-2 border border-gray-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Product Details */}
            <div className="flex-1 md:ml-4">
                <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-2 line-clamp-2">
                    {product.name}
                </h4>
                <div className="text-sm text-gray-400 space-y-0.5">
                    <p>Category: <span className="text-gray-500 font-medium">{product.category}</span></p>
                    <p>Seller: <span className="text-gray-500 font-medium">Official Brand Store</span></p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <button 
                        onClick={() => removeFromCart(product._id)}
                        className="text-red-500 border border-red-100 rounded px-3 py-1 text-xs font-bold hover:bg-red-50 transition-colors flex items-center space-x-1"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                    </button>
                    <button className="text-blue-600 border border-gray-200 rounded px-3 py-1 text-xs font-bold hover:bg-blue-50 transition-colors">Save for later</button>
                </div>
            </div>

            {/* Price & Qty */}
            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center">
                <p className="text-lg font-bold text-gray-900 mb-0 md:mb-4">USD {(product.price * item.quantity).toFixed(2)}</p>
                <div className="relative">
                    <select 
                        value={item.quantity}
                        onChange={(e) => addToCart(product._id, parseInt(e.target.value) - item.quantity)}
                        className="bg-white border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-700 outline-none font-medium appearance-none pr-8 min-w-[80px] shadow-sm cursor-pointer hover:border-blue-300 transition-colors"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>Qty: {n}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
