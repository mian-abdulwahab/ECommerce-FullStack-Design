import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, MessageSquare, Heart, ShoppingCart, Menu, Search, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState('All category');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const categoryMap = {
        'Electronics': 'consumer electronics and gadgets',
        'Clothes': 'clothing and apparel',
        'Home': 'home and outdoor',
        'Machinery': 'machinery and tools',
        'Toys': 'toys and hobby'
    };

    const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        let query = `/products?search=${searchTerm.trim()}`;
        if (selectedCategory !== 'All category') {
            const slug = categoryMap[selectedCategory];
            if (slug) query += `&category=${encodeURIComponent(slug)}`;
        }
        navigate(query);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="bg-white border-b border-gray-200 py-4 hidden md:block">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <div className="w-6 h-6 border-4 border-white rounded-md flex items-center justify-center relative">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">Brand</span>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-12 flex border-2 border-blue-600 rounded-lg overflow-hidden bg-white shadow-sm">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 outline-none text-gray-900 font-normal placeholder-gray-400 bg-white"
                        />
                        <div className="relative group border-l border-gray-200 bg-white">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-white px-4 py-2 text-gray-700 outline-none font-medium appearance-none pr-8 cursor-pointer hover:bg-gray-50 transition-colors h-full"
                            >
                                <option>All category</option>
                                <option>Electronics</option>
                                <option>Clothes</option>
                                <option>Home</option>
                                <option>Machinery</option>
                                <option>Toys</option>
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-600 transition-colors">▼</div>
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-8 py-2 font-bold hover:bg-blue-700 transition-colors active:scale-95 shadow-inner">
                            Search
                        </button>
                    </form>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-blue-600 transition-colors group relative">
                                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] mt-1 font-medium">{user.name}</span>
                                 <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                                    {user.isAdmin && (
                                        <button onClick={() => navigate('/admin')} className="w-full text-left px-4 py-2 text-xs text-blue-600 hover:bg-blue-50 flex items-center space-x-2 border-b border-gray-100">
                                            <LayoutDashboard className="w-3 h-3" />
                                            <span>Dashboard</span>
                                        </button>
                                    )}
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                                        <LogOut className="w-3 h-3" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-blue-600 transition-colors group" onClick={() => navigate('/login')}>
                                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] mt-1 font-medium">Login</span>
                            </div>
                        )}
                        <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-blue-600 transition-colors group">
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] mt-1 font-medium">Message</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-blue-600 transition-colors group" onClick={() => navigate('/orders')}>
                            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] mt-1 font-medium">Orders</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-blue-600 transition-colors relative group" onClick={() => navigate('/cart')}>
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] mt-1 font-medium">My cart</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsMenuOpen(true)}>
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex items-center space-x-2" onClick={() => navigate('/')}>
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <div className="w-4 h-4 border-2 border-white rounded flex items-center justify-center">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight">Brand</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <ShoppingCart className="w-6 h-6 text-gray-700" onClick={() => navigate('/cart')} />
                    <User className="w-6 h-6 text-gray-700" />
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden p-4 bg-gray-50 border-b border-gray-200">
                <form onSubmit={handleSearch} className="flex border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center px-3 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 py-2 outline-none text-gray-900 font-normal placeholder-gray-400 text-sm"
                    />
                </form>
            </div>

            {/* Mobile Drawer Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] transition-opacity" onClick={() => setIsMenuOpen(false)}>
                    <div className="w-64 h-full bg-white transition-transform transform translate-x-0" onClick={e => e.stopPropagation()}>
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-bold text-gray-900">{user ? user.name : 'Guest'}</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="py-4 px-2 space-y-1">
                            {user && user.isAdmin && (
                                <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} className="w-full px-3 py-2 text-sm text-blue-600 active:bg-blue-50 rounded-md cursor-pointer transition-colors flex items-center space-x-2 border-b border-gray-100">
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Admin Dashboard</span>
                                </button>
                            )}
                            {user ? (
                                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full px-3 py-2 text-sm text-red-600 active:bg-red-50 rounded-md cursor-pointer transition-colors flex items-center space-x-2">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-blue-600 active:bg-blue-50 rounded-md cursor-pointer transition-colors">
                                    Login / Register
                                </Link>
                            )}
                            <div onClick={() => { navigate('/products'); setIsMenuOpen(false); }} className="px-3 py-2 text-sm text-gray-700 active:bg-blue-50 active:text-blue-600 rounded-md cursor-pointer transition-colors font-medium">
                                Categories
                            </div>
                            <div className="px-3 py-2 text-sm text-gray-700 active:bg-blue-50 active:text-blue-600 rounded-md cursor-pointer transition-colors font-medium">
                                Favorites
                            </div>
                            <div onClick={() => { navigate('/orders'); setIsMenuOpen(false); }} className="px-3 py-2 text-sm text-gray-700 active:bg-blue-50 active:text-blue-600 rounded-md cursor-pointer transition-colors font-medium border-b border-gray-50">
                                My Orders
                            </div>
                            {['English | USD', 'Contact us', 'About'].map((item, i) => (
                                <div key={i} className="px-3 py-2 text-sm text-gray-700 active:bg-blue-50 active:text-blue-600 rounded-md cursor-pointer transition-colors font-medium">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
