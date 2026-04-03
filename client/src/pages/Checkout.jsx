import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Truck, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Load Stripe outside of component to avoid recreating it on every render
const stripePromise = loadStripe('pk_test_51THvQWDU3DrnQsV30YkaHA5qdRoIGWhhfiWjSYk6uTAVpxswKYfLhYaLQWHzOfGy8pC7ty7AFrcch5mA9VyjSMNX00BxawVe62'); // Replace with your test key or env variable

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shippingData, setShippingData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        postalCode: '',
        country: 'United States'
    });

    const tax = (cartTotal * 0.05);
    const shipping = cartTotal > 500 ? 0 : 25;
    const finalTotal = cartTotal + tax + shipping;

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            // 1. Create Payment Intent on backend
            const { data: { clientSecret } } = await api.post('/payment/create-payment-intent', {
                amount: finalTotal
            });

            // 2. Confirm Payment with Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: shippingData.fullName,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // 3. Create Order in backend
                    const orderData = {
                        orderItems: cart.items.map(item => ({
                            product: item.product._id,
                            name: item.product.name,
                            price: item.product.price,
                            quantity: item.quantity,
                            image: item.product.image
                        })),
                        shippingAddress: shippingData,
                        paymentResult: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                            update_time: new Date().toISOString(),
                            email_address: user.email
                        },
                        itemsPrice: cartTotal,
                        taxPrice: tax,
                        shippingPrice: shipping,
                        totalPrice: finalTotal
                    };

                    await api.post('/orders', orderData);

                    // 4. Success!
                    clearCart();
                    navigate('/order-success');
                }
            }
        } catch (err) {
            console.error('Payment Error:', err);
            setError(err.response?.data?.message || 'Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Shipping & Payment */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Truck className="w-5 h-5 mr-3 text-blue-600" /> Shipping Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                                <input
                                    type="text" name="fullName" required
                                    value={shippingData.fullName} onChange={handleShippingChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Street Address</label>
                                <input
                                    type="text" name="address" required
                                    value={shippingData.address} onChange={handleShippingChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">City</label>
                                <input
                                    type="text" name="city" required
                                    value={shippingData.city} onChange={handleShippingChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Postal Code</label>
                                <input
                                    type="text" name="postalCode" required
                                    value={shippingData.postalCode} onChange={handleShippingChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <CreditCard className="w-5 h-5 mr-3 text-blue-600" /> Payment Method
                        </h2>
                        <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 mb-6">
                            <div className="flex items-center text-blue-800 text-sm mb-2">
                                <CheckCircle className="w-4 h-4 mr-2" /> Secure payment with Stripe
                            </div>
                            <p className="text-xs text-blue-600/70">Enter your card details safely. We don't store your sensitive information.</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 focus-within:border-blue-500 transition-colors">
                            <CardElement options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#9e2146' },
                                },
                            }} />
                        </div>
                        {error && <p className="mt-4 text-sm font-medium text-red-500 flex items-center bg-red-50 p-3 rounded">{error}</p>}
                    </section>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <section className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-2xl font-bold mb-8 relative z-10">Order Summary</h2>

                        <div className="space-y-4 mb-8 relative z-10">
                            {cart.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-gray-400 text-sm">
                                    <span className="line-clamp-1 flex-1 pr-4">{item.product.name} x {item.quantity}</span>
                                    <span className="text-white font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-800 pt-6 space-y-4 mb-8 relative z-10">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax (5%)</span>
                                <span className="text-white font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-gray-800">
                                <span>Total</span>
                                <span className="text-blue-500">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!stripe || loading}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition-all active:scale-95 relative z-10 ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></span>
                                    Processing...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Lock className="w-5 h-5 mr-3" /> Pay Now & Place Order
                                </span>
                            )}
                        </button>
                        <p className="text-center text-gray-500 text-xs mt-6">By clicking, you agree to our Terms of Service</p>
                    </section>
                </div>
            </div>
        </form>
    );
};

const Checkout = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center font-sans tracking-tight">Complete Your Purchase</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
