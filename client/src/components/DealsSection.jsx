import { Link } from 'react-router-dom';

const DealsSection = ({ items = [] }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg mt-0 md:mt-6 flex flex-col md:flex-row shadow-sm overflow-hidden min-h-[240px]">
            {/* Countdown Area */}
            <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center items-center md:items-start min-w-[250px] bg-white">
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Deals and offers</h4>
                <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm font-medium text-center md:text-left">Hygiene & Electronics</p>
                <div className="flex space-x-2">
                    <div className="bg-gray-800 text-white w-11 h-11 md:w-12 md:h-12 rounded-md flex flex-col items-center justify-center">
                        <span className="text-sm md:text-base font-bold">04</span>
                        <span className="text-[8px] md:text-[9px] uppercase font-bold opacity-70">Days</span>
                    </div>
                    <div className="bg-gray-800 text-white w-11 h-11 md:w-12 md:h-12 rounded-md flex flex-col items-center justify-center">
                        <span className="text-sm md:text-base font-bold">13</span>
                        <span className="text-[8px] md:text-[9px] uppercase font-bold opacity-70">Hour</span>
                    </div>
                    <div className="bg-gray-800 text-white w-11 h-11 md:w-12 md:h-12 rounded-md flex flex-col items-center justify-center">
                        <span className="text-sm md:text-base font-bold">34</span>
                        <span className="text-[8px] md:text-[9px] uppercase font-bold opacity-70">Min</span>
                    </div>
                    <div className="bg-gray-800 text-white w-11 h-11 md:w-12 md:h-12 rounded-md flex flex-col items-center justify-center">
                        <span className="text-sm md:text-base font-bold">56</span>
                        <span className="text-[8px] md:text-[9px] uppercase font-bold opacity-70">Sec</span>
                    </div>
                </div>
            </div>

            {/* Products Area */}
            <div className="flex-1 flex divide-x divide-gray-100 overflow-x-auto overflow-y-hidden scrollbar-hide py-2">
                {items.map((product, index) => (
                    <Link to={`/product/${product._id}`} key={index} className="flex-shrink-0 w-40 md:w-48 p-4 md:p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="w-24 h-24 md:w-28 md:h-28 mb-3 md:mb-4 flex items-center justify-center">
                            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <p className="text-xs md:text-sm text-gray-800 mb-2 font-medium text-center line-clamp-1">{product.name}</p>
                        <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">
                            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) || 20}%
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DealsSection;
