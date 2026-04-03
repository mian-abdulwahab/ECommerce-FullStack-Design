import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
                    
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle className="w-12 h-12 text-blue-600" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-gray-900 mb-4 font-sans uppercase tracking-tight">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-10 leading-relaxed">
                        Thank you for your purchase. We've received your order and are processing it for shipment. You'll receive a confirmation email shortly.
                    </p>
                    
                    <div className="space-y-4">
                        <Link 
                            to="/products" 
                            className="bg-blue-600 text-white font-bold w-full py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center active:scale-95"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" /> Continue Shopping
                        </Link>
                        
                        <Link 
                            to="/" 
                            className="text-gray-500 font-bold w-full py-2 hover:text-blue-600 transition-colors flex items-center justify-center group"
                        >
                            <span>Back to Homepage</span>
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center space-x-6 grayscale opacity-50">
                        <Package className="w-6 h-6" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Fixora Logistics</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
