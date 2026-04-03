const SuppliersForm = () => {
    return (
        <div className="relative mt-8 rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-blue-400 p-6 md:p-10 min-h-[400px] flex flex-col md:flex-row items-center justify-between">
            {/* Decorative background image */}
            <div className="absolute inset-0 opacity-20 z-0">
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Industry"
                />
            </div>

            <div className="relative z-10 max-w-xl text-white mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">An easy way to send requests to all suppliers</h2>
                <p className="text-blue-50 text-sm md:text-base opacity-90 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
            </div>

            <div className="relative z-10 bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Send quote to suppliers</h4>
                <form className="space-y-4">
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="What item you need?"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-600 transition-colors text-gray-900 placeholder:text-gray-400"
                        />
                        <textarea
                            placeholder="Type more details"
                            rows="3"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-600 transition-colors text-gray-900 placeholder:text-gray-400 resize-none"
                        ></textarea>
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-600 transition-colors text-gray-900 placeholder:text-gray-400"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <select className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-600 transition-colors text-gray-900 bg-white appearance-none pr-8 cursor-pointer">
                                    <option>Pcs</option>
                                    <option>Litre</option>
                                    <option>Kg</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full md:w-fit bg-blue-600 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 transition-colors shadow-md">
                        Send inquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SuppliersForm;
