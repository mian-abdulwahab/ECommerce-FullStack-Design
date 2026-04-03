import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save, Trash2, Image as ImageIcon, Briefcase } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchProductById, createProduct, updateProduct, deleteProduct } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        oldPrice: '',
        category: 'clothing and apparel',
        image: '',
        description: '',
        rating: 4.5,
        reviews: 0,
        condition: 'new'
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }

        if (isEdit) {
            const loadProduct = async () => {
                try {
                    const { data } = await fetchProductById(id);
                    setFormData(data);
                } catch (err) {
                    console.error('Error loading product:', err);
                    alert('Product not found');
                    navigate('/admin');
                }
            };
            loadProduct();
        }
    }, [id, isEdit, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await updateProduct(id, formData);
                alert('Product updated successfully!');
            } else {
                await createProduct(formData);
                alert('Product created successfully!');
            }
            navigate('/admin');
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Error saving product: ' + err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                navigate('/admin');
            } catch (err) {
                alert('Error deleting product');
            }
        }
    };

    const categories = [
        "clothing and apparel",
        "home and outdoor",
        "consumer electronics and gadgets",
        "machinery and tools",
        "toys and hobby"
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link to="/admin" className="text-blue-600 text-sm flex items-center mb-2 hover:underline">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Briefcase className="w-8 h-8 mr-3 text-blue-600" />
                                {isEdit ? 'Edit Product' : 'Add New Product'}
                            </h1>
                        </div>
                        {isEdit && (
                            <button 
                                onClick={handleDelete}
                                className="text-red-600 font-bold flex items-center hover:text-red-700 transition-colors"
                            >
                                <Trash2 className="w-5 h-5 mr-2" /> Delete
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 font-sans">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                        placeholder="e.g., T-shirts with multiple colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Price ($)</label>
                                        <input 
                                            type="number" 
                                            name="price"
                                            required
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                            placeholder="9.50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Old Price ($)</label>
                                        <input 
                                            type="number" 
                                            name="oldPrice"
                                            value={formData.oldPrice}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                            placeholder="12.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                                    <select 
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors appearance-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Image URL</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input 
                                                type="text" 
                                                name="image"
                                                required
                                                value={formData.image}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                                placeholder="https://unsplash.com/..."
                                            />
                                        </div>
                                    </div>
                                    {formData.image && (
                                        <div className="mt-4 w-full aspect-video bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center p-4">
                                            <img src={formData.image} alt="Preview" className="max-h-full object-contain shadow-sm" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                            <textarea 
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-colors"
                                placeholder="Describe your product details..."
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                            <button 
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="px-8 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white font-bold px-10 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminProductForm;
