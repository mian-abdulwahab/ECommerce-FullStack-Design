import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Search, ChevronLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchProducts, deleteProduct } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }
        loadProducts();
    }, [user, navigate]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const { data } = await fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert('Error deleting product');
            }
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-blue-600">Loading Dashboard...</div>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <Link to="/" className="text-blue-600 text-sm flex items-center mb-2 hover:underline">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Store
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <Package className="w-8 h-8 mr-3 text-blue-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">Manage your store products and inventory</p>
                    </div>
                    
                    <div className="flex gap-3">
                        <Link 
                            to="/admin/orders" 
                            className="bg-gray-800 text-white font-bold px-6 py-3 rounded-md hover:bg-gray-900 transition-all flex items-center justify-center shadow-lg active:scale-95"
                        >
                            <ShoppingBag className="w-5 h-5 mr-2" /> Manage Orders
                        </Link>
                        <Link 
                            to="/admin/product/new" 
                            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg active:scale-95"
                        >
                            <Plus className="w-5 h-5 mr-2" /> Add New Product
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Search products by name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Rating</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-sans">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center p-1">
                                                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</div>
                                                    <div className="text-xs text-gray-400">ID: {product._id.substring(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-900">${product.price}</div>
                                            {product.oldPrice && <div className="text-xs text-gray-400 line-through">${product.oldPrice}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm font-medium text-orange-500">
                                                ★ {product.rating || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button 
                                                onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
