import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SubHeader from '../components/SubHeader';
import HeroSection from '../components/HeroSection';
import DealsSection from '../components/DealsSection';
import CategorySection from '../components/CategorySection';
import SuppliersForm from '../components/SuppliersForm';
import RecommendedItems from '../components/RecommendedItems';
import ServicesSection from '../components/ServicesSection';
import RegionSuppliers from '../components/RegionSuppliers';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { fetchProducts } from '../utils/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { data } = await fetchProducts();
                console.log("Fetched products:", data);
                setProducts(data);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // More robust filtering for Home page sections
    const homeOutdoorItems = products.filter(p =>
        p.category?.toLowerCase().includes('home')
    ).slice(0, 8);

    const electronicsItems = products.filter(p =>
        p.category?.toLowerCase().includes('electronics')
    ).slice(0, 8);

    // Fallback if filters return nothing but we have products
    const displayHomeItems = homeOutdoorItems.length > 0 ? homeOutdoorItems : products.slice(0, 8);
    const displayElecItems = electronicsItems.length > 0 ? electronicsItems : products.slice(8, 16);

    // Filter for deals (items with oldPrice)
    const dealsItems = products.filter(p => p.oldPrice).slice(0, 5);
    const displayDeals = dealsItems.length > 0 ? dealsItems : products.slice(0, 5);

    // Filter for recommended (random or different slice)
    const displayRecommended = products.slice(5, 15);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-blue-600">Loading components...</div>;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />
            <SubHeader />

            <main className="container mx-auto px-4 pb-12">
                <HeroSection />
                <DealsSection items={displayDeals} />

                {products.length > 0 ? (
                    <>
                        <CategorySection
                            title="Home and outdoor"
                            bannerImage="/images/image92.png"
                            items={displayHomeItems}
                            bgColor="#FFF7ED"
                        />

                        <CategorySection
                            title="Consumer electronics and gadgets"
                            bannerImage="/images/electronics-banner.png"
                            items={displayElecItems}
                            bgColor="#EFF6FF"
                        />
                    </>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 mt-6 text-center">
                        <p className="text-gray-500 font-medium">No products found in the database. Please check your connection or seed the database.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Retry Loading
                        </button>
                    </div>
                )}

                <SuppliersForm />
                <RecommendedItems items={displayRecommended} />
                <ServicesSection />
                <RegionSuppliers />
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;
