import { Link } from 'react-router-dom';

const YouMayLike = ({ items = [] }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-fit">
            <h4 className="font-bold text-gray-900 mb-4">You may like</h4>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <Link to={`/product/${item._id}`} key={i} className="flex items-center space-x-3 group cursor-pointer">
                        <div className="w-16 h-16 rounded border border-gray-100 flex-shrink-0 flex items-center justify-center p-1 bg-white">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors font-medium">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-1">USD {item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default YouMayLike;
