import { Link } from 'react-router-dom';

const RecommendedItems = ({ items = [] }) => {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended items</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item, index) => (
                    <Link to={`/product/${item._id}`} key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col group h-full">
                        <div className="aspect-square w-full mb-4 flex items-center justify-center overflow-hidden bg-white">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <p className="text-base font-bold text-gray-900 mb-1">USD {item.price}</p>
                        <p className="text-sm text-gray-500 leading-tight line-clamp-2">{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecommendedItems;
