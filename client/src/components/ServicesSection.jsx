import { Search, Package, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
    const services = [
        { title1: "Source from", title2: "Industry Hubs", icon: <Search className="w-6 h-6 text-gray-800" />, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop", link: "/products" },
        { title1: "Customize Your", title2: "Products", icon: <Package className="w-6 h-6 text-gray-800" />, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop", link: "/products" },
        { title1: "Fast, reliable shipping", title2: "by ocean or air", icon: <Send className="w-6 h-6 text-gray-800" />, image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=600&auto=format&fit=crop", link: "/products" },
        { title1: "Product monitoring", title2: "and inspection", icon: <ShieldCheck className="w-6 h-6 text-gray-800" />, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", link: "/products" },
    ];

    return (
        <div className="mt-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our extra services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service, index) => (
                    <Link to={service.link} key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer relative block">
                        <div className="h-32 overflow-hidden relative">
                            <img src={service.image} alt={service.title2} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors"></div>
                        </div>
                        <div className="p-5 bg-white relative min-h-[100px]">
                            {/* Overlapping Icon Container */}
                            <div className="absolute -top-7 right-6 w-14 h-14 bg-[#D1E7FF] border-4 border-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#BEE1FF] transition-colors">
                                {service.icon}
                            </div>
                            <p className="text-gray-900 text-sm leading-snug pr-12">
                                <span className="block">{service.title1}</span>
                                <span className="font-bold">{service.title2}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ServicesSection;
