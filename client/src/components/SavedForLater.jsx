import { ShoppingCart } from 'lucide-react';

const SavedForLater = ({ items }) => {
    return (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Saved for later</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {items.map((item, i) => (
                    <div key={i} className="flex flex-col group cursor-pointer h-full">
                        <div className="aspect-[4/3] w-full bg-gray-100 rounded-md flex items-center justify-center p-4 mb-3 overflow-hidden border border-gray-50">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base font-bold text-gray-900 mb-1">${item.price}</p>
                            <p className="text-sm text-gray-500 line-clamp-2 leading-tight mb-4 group-hover:text-blue-600 transition-colors font-medium">
                                {item.name}
                            </p>
                        </div>
                        <button className="w-full flex items-center justify-center space-x-2 text-blue-600 border border-gray-200 font-bold py-2 rounded-md hover:bg-blue-50 transition-colors text-sm shadow-sm">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Move to cart</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedForLater;
