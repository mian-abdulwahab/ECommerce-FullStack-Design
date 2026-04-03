import { Heart, ShieldCheck, Globe } from 'lucide-react';

const SupplierSidebar = () => {
    return (
        <div className="w-full lg:w-72 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-blue-100 text-blue-800 font-bold p-3 rounded-md text-xl">R</div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 leading-tight">Supplier</p>
                        <p className="text-sm text-gray-500 leading-tight">Guanjoi Trading LLC</p>
                    </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100 mb-6 font-sans">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <img src="https://flagcdn.com/w20/de.png" className="w-5 h-3.5 object-cover" />
                        <span>Germany, Berlin</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verified Seller</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                        <Globe className="w-4 h-4" />
                        <span>Worldwide shipping</span>
                    </div>
                </div>

                <button className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-md hover:bg-blue-700 transition-colors mb-3">
                    Send inquiry
                </button>
                <button className="w-full bg-white border border-gray-200 text-blue-600 font-bold py-2.5 rounded-md hover:bg-gray-50 transition-colors">
                    Seller's profile
                </button>
            </div>

            <button className="w-full flex items-center justify-center space-x-2 text-blue-600 font-bold py-2 hover:underline">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Save for later</span>
            </button>
        </div>
    );
};

export default SupplierSidebar;
