import { useNavigate } from 'react-router-dom';

const CartSummary = ({ subtotal, discount, tax, total }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full lg:w-72 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <h5 className="text-sm text-gray-600 mb-4">Have a coupon?</h5>
                <div className="flex border border-gray-200 rounded overflow-hidden mb-8">
                    <input
                        type="text"
                        placeholder="Add coupon"
                        className="px-3 py-2 text-sm outline-none flex-1 font-medium bg-transparent"
                    />
                    <button className="bg-white border-l border-gray-200 text-blue-600 font-bold px-4 hover:bg-blue-50 transition-colors text-sm">Apply</button>
                </div>

                <div className="space-y-3 pt-3">
                    <div className="flex justify-between text-base">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-gray-900 font-medium">USD {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="text-gray-500">Discount:</span>
                        <span className="text-red-500 font-medium">-USD {discount}</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="text-gray-500">Tax:</span>
                        <span className="text-green-600 font-medium">+USD {tax}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-4 mt-4">
                        <span>Total:</span>
                        <span className="text-gray-900 font-bold">USD {total}</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-green-600 text-white font-bold py-3 mt-8 rounded hover:bg-green-700 transition-colors shadow-md text-lg"
                >
                    Checkout
                </button>

                <div className="mt-4 flex flex-wrap gap-2 justify-center pb-2">
                    {[
                        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                        "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                        "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                        "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                    ].map((icon, idx) => (
                        <img key={idx} src={icon} alt="Payment" className="h-6 object-contain opacity-70 grayscale hover:grayscale-0 transition-opacity" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
