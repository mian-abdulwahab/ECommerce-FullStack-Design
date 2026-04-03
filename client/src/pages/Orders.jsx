import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Clock, CheckCircle, Truck, XCircle, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/myorders');
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Processing': return <Clock className="w-4 h-4" />;
            case 'Shipped': return <Truck className="w-4 h-4" />;
            case 'Delivered': return <CheckCircle className="w-4 h-4" />;
            case 'Cancelled': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-blue-600">Loading your orders...</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <SubHeader />
            
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <Link to="/" className="text-blue-600 text-sm flex items-center mb-2 hover:underline">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back to shopping
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <ShoppingBag className="w-8 h-8 mr-3 text-blue-600" />
                            My Orders
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">View and track your recent orders</p>
                    </div>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
                                    <div className="flex items-center space-x-6">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Order ID</p>
                                            <p className="text-sm font-bold text-gray-900">#{order._id.substring(0, 12).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date</p>
                                            <p className="text-sm font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                                            <p className="text-sm font-bold text-blue-600">${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyles(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex space-x-4">
                                                <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0 flex items-center justify-center border border-gray-100">
                                                    <img src={item.product?.image} alt={item.product?.name} className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-xs font-bold text-blue-600 mt-1">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50/30 border-t border-gray-100 flex justify-end items-center space-x-4">
                                     <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">
                                        Track order
                                     </button>
                                     <button className="text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-widest">
                                        View Details
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Package className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-500 max-w-xs mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
                        >
                            Go to Shop
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Orders;
