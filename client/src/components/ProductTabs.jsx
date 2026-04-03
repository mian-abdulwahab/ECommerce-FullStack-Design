import { useState } from 'react';
import { Check } from 'lucide-react';

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState('Description');
    const tabs = ['Description', 'Reviews', 'Shipping', 'About seller'];

    const specs = [
        { label: "Model", value: "#8786867" },
        { label: "Style", value: "Classic style" },
        { label: "Certificate", value: "ISO-898921212" },
        { label: "Size", value: "34mm x 450mm x 19mm" },
        { label: "Memory", value: "36GB RAM" },
    ];

    const features = [
        "Some great feature name here",
        "Lorem ipsum dolor sit amet, consectetur",
        "Duis aute irure dolor in reprehenderit",
        "Some great feature name here",
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex border-b border-gray-200 px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                        )}
                    </button>
                ))}
            </div>

            <div className="p-6">
                {activeTab === 'Description' && (
                    <div className="space-y-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex border-b border-gray-100 py-2">
                                    <span className="text-gray-400 text-sm w-32">{spec.label}</span>
                                    <span className="text-gray-600 text-sm">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        <ul className="space-y-2">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600">
                                    <Check className="w-4 h-4 mr-2 text-gray-400" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab !== 'Description' && (
                    <div className="py-10 text-center text-gray-400 text-sm">
                        Content for {activeTab} will appear here.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
