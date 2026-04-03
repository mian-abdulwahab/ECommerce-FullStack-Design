import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubHeader from '../components/SubHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import FilterSidebar from '../components/FilterSidebar';
import ProductListView from '../components/ProductListView';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import api from '../utils/api';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const searchTerm = queryParams.get('search');
    const categoryTerm = queryParams.get('category');

    const categoryDisplayNameMap = {
        'consumer electronics and gadgets': 'Electronics',
        'clothing and apparel': 'Clothing',
        'home and outdoor': 'Home & Garden',
        'machinery and tools': 'Tools & Machinery',
        'toys and hobby': 'Toys & Hobby'
    };

    const displayCategory = categoryDisplayNameMap[categoryTerm] || categoryTerm;

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products${search || ''}`);
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [search]);

    const breadcrumbPaths = ["Home", "Products"];
    if (displayCategory) breadcrumbPaths.push(displayCategory);
    if (searchTerm) breadcrumbPaths.push(`Search: ${searchTerm}`);

    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading products...</p>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />
            <SubHeader />

            <div className="container mx-auto px-4 pb-12">
                <Breadcrumbs paths={breadcrumbPaths} />

                <div className="flex flex-col lg:flex-row gap-8 mt-2">
                    <FilterSidebar />
                    <ProductListView
                        products={products}
                        count={products.length}
                        title={searchTerm ? `Results for "${searchTerm}"` : (displayCategory || "All items")}
                    />
                </div>
            </div>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductListing;
