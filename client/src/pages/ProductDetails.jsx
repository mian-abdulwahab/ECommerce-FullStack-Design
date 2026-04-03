import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubHeader from '../components/SubHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGallery from '../components/ProductGallery';
import ProductDetailsInfo from '../components/ProductDetailsInfo';
import SupplierSidebar from '../components/SupplierSidebar';
import ProductTabs from '../components/ProductTabs';
import YouMayLike from '../components/YouMayLike';
import RelatedProducts from '../components/RelatedProducts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { fetchProductById, fetchProducts } from '../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProductDetails = async () => {
            setLoading(true);
            try {
                const { data } = await fetchProductById(id);
                setProduct({
                    ...data,
                    mainImage: data.image,
                    thumbnails: [data.image, data.image, data.image]
                });

                // Fetch related products
                const { data: allProducts } = await fetchProducts();
                const filtered = allProducts.filter(p => p.category === data.category && p._id !== id);
                setRelatedProducts(filtered.slice(0, 6));

            } catch (err) {
                console.error('Error fetching product details:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProductDetails();
    }, [id]);

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-blue-600">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-red-600">Product not found</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <SubHeader />

            <div className="container mx-auto px-4 pb-12">
                <div className="flex items-center justify-between py-2">
                    <Breadcrumbs paths={["Home", "Products", product.category, product.name]} />
                    <Link to="/products" className="text-blue-600 font-bold text-sm hover:underline">
                        &larr; Back to all products
                    </Link>
                </div>

                {/* Main Product Info Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <ProductGallery mainImage={product.mainImage} thumbnails={product.thumbnails} />
                        <ProductDetailsInfo product={product} />
                        <SupplierSidebar />
                    </div>
                </div>

                {/* Details & Sidebar */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 space-y-6">
                        <ProductTabs />
                        <RelatedProducts items={relatedProducts} />

                        {/* Promo Banner */}
                        <div className="bg-blue-600 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
                            <div className="absolute right-0 top-0 w-1/3 h-full bg-blue-500 skew-x-12 translate-x-1/2 opacity-50 z-0"></div>
                            <div className="relative z-10 text-center md:text-left mb-4 md:mb-0">
                                <h3 className="text-xl font-bold">Super discount on more than 100 USD</h3>
                                <p className="text-sm opacity-80">Get exclusive deals when you order bulk quantities from verified suppliers.</p>
                            </div>
                            <Link to="/products" className="relative z-10 bg-orange-500 text-white font-bold px-6 py-2 rounded shadow-md hover:bg-orange-600 transition-colors whitespace-nowrap">
                                Shop now
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-72">
                        <YouMayLike items={relatedProducts.slice(0, 5)} />
                    </div>
                </div>
            </div>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductDetails;
