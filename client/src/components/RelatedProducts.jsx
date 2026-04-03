import { Link } from 'react-router-dom';

const RelatedProducts = ({ items = [] }) => {
    return (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {items.map((item, i) => (
                    <Link to={`/product/${item._id}`} key={i} className="flex flex-col group cursor-pointer">
                        <div className="aspect-square w-full bg-gray-50 rounded-md flex items-center justify-center p-2 mb-3 overflow-hidden">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400">USD {item.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
