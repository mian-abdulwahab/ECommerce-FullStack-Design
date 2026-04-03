import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const categories = [
        { name: "Automobiles", slug: "automobiles" },
        { name: "Clothes and wear", slug: "clothing and apparel" },
        { name: "Home interiors", slug: "home and outdoor" },
        { name: "Computer and tech", slug: "consumer electronics and gadgets" },
        { name: "Tools, equipments", slug: "machinery and tools" },
        { name: "Sports and outdoor", slug: "home and outdoor" },
        { name: "Animal and pets", slug: "toys and hobby" },
        { name: "Machinery tools", slug: "machinery and tools" },
        { name: "More category", slug: "" }
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 mt-6 font-sans">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Sidebar - Categories */}
                <div className="hidden lg:block lg:w-[240px] shrink-0">
                    <ul className="space-y-0.5">
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                onClick={() => navigate(cat.slug ? `/products?category=${encodeURIComponent(cat.slug)}` : '/products')}
                                className={`px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm ${index === 0 ? 'bg-[#E5F1FF] font-bold text-gray-900' : 'text-gray-600 hover:bg-[#E5F1FF] hover:text-gray-900'}`}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Center - Banner */}
                <div 
                    className="flex-1 relative overflow-hidden rounded-md bg-cover bg-center min-h-[380px] flex items-center px-12"
                    style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
                >
                    <div className="absolute inset-0 bg-[#A2DED0]/70 z-0"></div>
                    <div className="relative z-10 max-w-sm">
                        <h3 className="text-2xl text-gray-800 mb-1">Latest trending</h3>
                        <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Electronic items</h2>
                        <Link 
                            to="/products?category=consumer%20electronics%20and%20gadgets" 
                            className="bg-white text-gray-900 font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all inline-block active:scale-95"
                        >
                            Learn more
                        </Link>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden md:flex flex-col md:w-[200px] shrink-0 space-y-3">
                    {/* User Welcome */}
                    <div className="bg-[#E3F0FF] p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-white/50 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <img 
                                    src={user ? `https://ui-avatars.com/api/?name=${user.name}&background=random` : "https://www.w3schools.com/howto/img_avatar.png"} 
                                    className="w-full h-full object-cover opacity-80" 
                                    alt="avatar" 
                                />
                            </div>
                            <p className="text-sm text-gray-800 font-semibold leading-tight">
                                {user ? `Hi, ${user.name.split(' ')[0]}` : "Hi, user let's get started"}
                            </p>
                        </div>
                        {!user ? (
                            <div className="space-y-2">
                                <Link to="/register" className="block w-full text-center bg-[#0D6EFD] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm active:scale-95">
                                    Join now
                                </Link>
                                <Link to="/login" className="block w-full text-center bg-white text-[#0D6EFD] border border-gray-200 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm active:scale-95">
                                    Log in
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link to="/products" className="block w-full text-center bg-[#0D6EFD] text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-sm active:scale-95">
                                    Shop now
                                </Link>
                                <Link to="/cart" className="block w-full text-center bg-white text-[#0D6EFD] border border-gray-200 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm active:scale-95">
                                    My Cart
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Promo 1 */}
                    <div onClick={() => navigate('/products')} className="bg-[#F38332] p-4 rounded-lg text-white shadow-sm hover:brightness-105 transition-all cursor-pointer h-24 flex items-center">
                        <p className="text-sm font-medium leading-normal">Get US $10 off with a new supplier</p>
                    </div>

                    {/* Promo 2 */}
                    <div onClick={() => navigate('/products')} className="bg-[#55BDC3] p-4 rounded-lg text-white shadow-sm hover:brightness-105 transition-all cursor-pointer h-24 flex items-center">
                        <p className="text-sm font-medium leading-normal">Send quotes with supplier preferences</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
