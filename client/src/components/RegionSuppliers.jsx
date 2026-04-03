const RegionSuppliers = () => {
    const regions = [
        { country: "Arabic Emirates", domain: "shopname.ae", flag: "ae" },
        { country: "Australia", domain: "shopname.ae", flag: "au" },
        { country: "United States", domain: "shopname.ae", flag: "us" },
        { country: "Russia", domain: "shopname.ae", flag: "ru" },
        { country: "Italy", domain: "shopname.ae", flag: "it" },
        { country: "Denmark", domain: "shopname.ae", flag: "dk" },
        { country: "France", domain: "shopname.ae", flag: "fr" },
        { country: "Arabic Emirates", domain: "shopname.ae", flag: "ae" },
        { country: "China", domain: "shopname.ae", flag: "cn" },
        { country: "Great Britain", domain: "shopname.ae", flag: "gb" },
    ];

    return (
        <div className="mt-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Suppliers by region</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-8">
                {regions.map((region, index) => (
                    <div key={index} className="flex items-center space-x-3 cursor-pointer group">
                        <img
                            src={`https://flagcdn.com/w40/${region.flag}.png`}
                            alt={region.country}
                            className="w-7 h-5 object-cover rounded shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div>
                            <p className="text-gray-800 text-sm font-medium group-hover:text-blue-600 transition-colors leading-tight">{region.country}</p>
                            <p className="text-gray-400 text-[10px] leading-tight">{region.domain}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionSuppliers;
