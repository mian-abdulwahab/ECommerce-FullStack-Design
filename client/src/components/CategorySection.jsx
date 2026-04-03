import { Link } from 'react-router-dom';

const CategorySection = ({ title, bannerImage, items, bgColor }) => {
    return (
        <div className="bg-white md:border md:border-gray-200 md:rounded-lg mt-4 md:mt-6 flex flex-col lg:flex-row shadow-sm overflow-hidden">
            {/* Sidebar Banner */}
            <div 
                className="w-full lg:w-[280px] relative p-6 flex flex-col min-h-[150px] md:min-h-[240px] bg-cover bg-center" 
                style={{ backgroundImage: `url(${bannerImage})`, backgroundColor: bgColor || '#f3f4f6' }}
            >
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight max-w-[140px] font-sans">{title}</h4>
                    <Link 
                        to={`/products?category=${encodeURIComponent(title === "Home and outdoor" ? "home and outdoor" : (title === "Consumer electronics and gadgets" ? "consumer electronics and gadgets" : ""))}`}
                        className="bg-white text-gray-900 font-bold px-6 py-2.5 rounded-lg shadow-sm border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all mt-2 text-sm active:scale-95 shadow-md inline-block"
                    >
                        Source now
                    </Link>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-gray-100 border-t md:border-t-0 border-gray-100">
                {items.map((item, index) => (
                    <Link to={`/product/${item._id}`} key={index} className="p-4 flex flex-row items-start justify-between hover:bg-gray-50 transition-colors cursor-pointer group border-gray-100 min-h-[120px]">
                        <div className="flex-1 pr-2">
                            <p className="text-sm text-gray-800 mb-1 font-medium group-hover:text-blue-600 transition-colors line-clamp-2">{item.name}</p>
                            <p className="text-[10px] md:text-xs text-gray-400">From <br /> <span className="text-gray-500 font-medium">USD {item.price}</span></p>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
