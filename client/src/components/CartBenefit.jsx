import { ShieldCheck, MessageSquare, Truck } from 'lucide-react';

const CartBenefit = () => {
    const benefits = [
        { title: "Secure payment", desc: "Have you ever finally just", icon: <ShieldCheck className="w-5 h-5 text-gray-400" /> },
        { title: "Customer support", desc: "Have you ever finally just", icon: <MessageSquare className="w-5 h-5 text-gray-400" /> },
        { title: "Free delivery", desc: "Have you ever finally just", icon: <Truck className="w-5 h-5 text-gray-400" /> },
    ];

    return (
        <div className="mt-8 flex flex-wrap gap-4">
            {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3 pr-10">
                    <div className="bg-gray-200 p-2.5 rounded-full flex items-center justify-center">
                        {benefit.icon}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-none mb-1">{benefit.title}</p>
                        <p className="text-xs text-gray-400 leading-none">{benefit.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartBenefit;
