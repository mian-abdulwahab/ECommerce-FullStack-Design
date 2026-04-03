const Newsletter = () => {
    return (
        <div className="bg-gray-100 py-16 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Subscribe on our newsletter</h3>
            <p className="text-gray-500 mb-8 max-w-sm">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="flex w-full max-w-md bg-white p-1 rounded-lg border border-gray-200">
                <input
                    type="email"
                    placeholder="Email"
                    className="flex-1 px-4 py-2 outline-none text-gray-700 bg-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition-colors">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default Newsletter;
