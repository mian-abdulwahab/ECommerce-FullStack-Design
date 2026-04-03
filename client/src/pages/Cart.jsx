import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import SubHeader from '../components/SubHeader';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import CartBenefit from '../components/CartBenefit';
import SavedForLater from '../components/SavedForLater';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cart, loading, clearCart, cartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const discount = cartTotal > 500 ? (cartTotal * 0.1).toFixed(2) : "0.00";
    const tax = (cartTotal * 0.05).toFixed(2);
    const total = (cartTotal - parseFloat(discount) + parseFloat(tax)).toFixed(2);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-blue-600">Updating cart...</div>;

    if (!user) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <Navbar />
                <SubHeader />
                <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-12 rounded-lg border border-gray-200 shadow-sm max-w-md">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Please login to view your shopping cart and complete your order.</p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors shadow-md w-full"
                        >
                            Login to Account
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <SubHeader />

            <div className="container mx-auto px-4 pb-12 pt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">My cart ({cart.items.length})</h2>

                {cart.items.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Main Cart Area */}
                        <div className="flex-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="divide-y divide-gray-100">
                                    {cart.items.map((item, i) => (
                                        <CartItem key={i} item={item} />
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                                    <button 
                                        onClick={() => navigate('/products')}
                                        className="flex items-center space-x-2 bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md active:scale-95"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        <span className="text-sm">Back to shop</span>
                                    </button>
                                    <button 
                                        onClick={clearCart}
                                        className="text-red-500 border border-red-100 font-bold px-6 py-2 rounded-md hover:bg-red-50 transition-colors text-sm shadow-sm"
                                    >
                                        Remove all
                                    </button>
                                </div>
                            </div>

                            <CartBenefit />
                        </div>

                        {/* Summary Sidebar */}
                        <CartSummary
                            subtotal={cartTotal.toFixed(2)}
                            discount={discount}
                            tax={tax}
                            total={total}
                        />
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-16 flex flex-col items-center justify-center text-center shadow-sm">
                        <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No items in cart</h3>
                        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's start shopping!</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-blue-600 text-white font-bold py-3 px-10 rounded-md hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Products to Shop
                        </button>
                    </div>
                )}

                <div className="mt-12 pt-8 border-t border-gray-200">
                     <h3 className="text-xl font-bold text-gray-900 mb-6">Saved for later</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
                         {/* Static saved items for design consistency */}
                         {[1, 2, 3, 4].map(idx => (
                             <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                                 <div className="aspect-square bg-gray-50 rounded mb-4"></div>
                                 <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                                 <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Promo Banner */}
                <div className="mt-12 bg-blue-600 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative shadow-xl">
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-500 skew-x-12 translate-x-1/2 opacity-50 z-0"></div>
                    <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">Super discount on more than 100 USD</h3>
                        <p className="text-blue-100">Unlock premium benefits and international shipping deals today!</p>
                    </div>
                    <button className="relative z-10 bg-orange-500 text-white font-bold px-10 py-3 rounded-md shadow-lg hover:bg-orange-600 transition-all active:scale-95 whitespace-nowrap">
                        Shop now
                    </button>
                </div>
            </div>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default Cart;
