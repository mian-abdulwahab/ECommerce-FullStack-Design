import { Facebook, Twitter, Linkedin, Instagram, Youtube, ShoppingCart, ChevronDown } from 'lucide-react';

const Footer = () => {
    const sections = [
        {
            title: "About",
            links: ["About Us", "Find store", "Categories", "Blogs"]
        },
        {
            title: "Partnership",
            links: ["About Us", "Find store", "Categories", "Blogs"]
        },
        {
            title: "Information",
            links: ["Help Center", "Money Refund", "Shipping", "Contact us"]
        },
        {
            title: "For users",
            links: ["Login", "Register", "Settings", "My Orders"]
        }
    ];

    return (
        <footer className="bg-white pt-12 border-t border-gray-200 font-sans">
            <div className="container mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center space-x-2 mb-6 cursor-pointer group">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-sm group-hover:bg-blue-700 transition-colors">
                                <ShoppingCart className="text-white w-6 h-6 fill-current" />
                            </div>
                            <span className="text-2xl font-black text-blue-600 tracking-tight">Brand</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-[260px]">
                            Best information about the company gies here but now lorem ipsum is
                        </p>
                        <div className="flex space-x-3">
                            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, idx) => (
                                <div key={idx} className="bg-gray-200 text-gray-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
                                    <Icon className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">{section.title}</h5>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a href="#" className="text-gray-500 text-sm hover:text-blue-600 transition-colors whitespace-nowrap">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* App Links */}
                    <div className="lg:col-span-2">
                        <h5 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Get app</h5>
                        <div className="space-y-3">
                            <a href="#" className="block transition-transform active:scale-95">
                                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10 w-auto" />
                            </a>
                            <a href="#" className="block transition-transform active:scale-95">
                                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" className="h-14 w-auto -ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#f8f9fa] border-t border-gray-100 py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p className="mb-4 md:mb-0">© 2023 Ecommerce.</p>
                    <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-900 transition-colors">
                        <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-6 h-auto shadow-sm" />
                        <span className="font-medium">English</span>
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
