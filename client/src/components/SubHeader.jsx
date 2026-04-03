import { Menu, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SubHeader = () => {
    const navigate = useNavigate();
    const menuItems = [
        { name: "Hot offers", path: "/products?sort=discount" },
        { name: "Gift boxes", path: "/products?search=gift" },
        { name: "Projects", path: "/products" },
        { name: "Menu item", path: "/products" },
        { name: "Help", path: "/help" }
    ];

    return (
        <div className="bg-white border-b border-gray-200 py-3 hidden md:block">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <div 
                        onClick={() => navigate('/products')}
                        className="flex items-center space-x-2 cursor-pointer font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                        <span>All category</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1 cursor-pointer font-medium text-gray-800">
                        <span>English, USD</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer font-medium text-gray-800">
                        <span>Ship to</span>
                        <img
                            src="https://flagcdn.com/w20/de.png"
                            alt="Germany"
                            className="w-5 h-3.5 object-cover ml-1"
                        />
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
