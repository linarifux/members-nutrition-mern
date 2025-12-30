import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../redux/slices/productsApiSlice';
import { Loader2, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/admin/AdminSidebar'; // <--- Import Sidebar

const ProductListPage = () => {
  const navigate = useNavigate(); 
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  // --- 1. The Actual Delete Logic ---
  const performDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // --- 2. The "Modern" Confirmation Toast ---
  const deleteHandler = (id) => {
    toast(({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-red-400 font-bold">
            <AlertTriangle size={18} />
            <span>Delete this product?</span>
        </div>
        <div className="flex gap-3 justify-end">
            <button 
                className="text-gray-400 text-sm hover:text-white font-medium px-2 transition-colors"
                onClick={closeToast}
            >
                Cancel
            </button>
            <button 
                className="bg-red-500/20 text-red-200 border border-red-500/50 px-3 py-1 rounded-md text-sm font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
                onClick={() => {
                    performDelete(id);
                    closeToast();
                }}
            >
                Delete
            </button>
        </div>
      </div>
    ), {
        autoClose: false, 
        closeButton: false, 
        position: "top-center" 
    });
  };

  const createProductHandler = () => {
    navigate('/admin/product/create');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <button 
            onClick={createProductHandler}
            className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-accent/20 btn-glow"
          >
            <Plus size={20} /> Create Product
          </button>
        </div>

        {isLoading ? (
          <Loader2 className="animate-spin mx-auto mt-10 text-accent" />
        ) : error ? (
          <div className="text-red-400 text-center mt-10 glass-panel p-4 rounded-lg border-red-500/20">
            {error?.data?.message}
          </div>
        ) : (
          <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">NAME</th>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">RETAIL</th>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">WHOLESALE</th>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">CATEGORY</th>
                    <th className="p-4 font-bold text-xs text-gray-400 uppercase tracking-wider">ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {products.map((product) => (
                    <tr key={product._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-xs text-gray-500">
                            {product._id.substring(product._id.length - 6)}...
                        </td>
                        <td className="p-4 font-medium text-gray-200">
                            {product.name}
                            <div className="flex gap-1 mt-1">
                                {product.isFeatured && (
                                    <span className="text-[10px] bg-yellow-500/20 text-yellow-200 border border-yellow-500/20 px-1.5 py-0.5 rounded">Featured</span>
                                )}
                                {product.isArchived && (
                                    <span className="text-[10px] bg-gray-700/50 text-gray-400 border border-gray-600 px-1.5 py-0.5 rounded">Archived</span>
                                )}
                            </div>
                        </td>
                        <td className="p-4 text-gray-300">${product.basePriceRetail}</td>
                        <td className="p-4 text-accent font-bold">${product.basePriceWholesale}</td>
                        <td className="p-4 text-sm text-gray-400">{product.category}</td>
                        <td className="p-4">
                            <div className="flex gap-2">
                                <Link 
                                    to={`/admin/product/${product._id}/edit`} 
                                    className="p-2 bg-white/5 text-gray-300 rounded hover:bg-accent hover:text-white transition-all"
                                >
                                    <Edit size={16} />
                                </Link>
                                <button 
                                    onClick={() => deleteHandler(product._id)}
                                    className="p-2 bg-white/5 text-gray-400 rounded hover:bg-red-500/20 hover:text-red-400 transition-all"
                                    disabled={loadingDelete}
                                >
                                    {loadingDelete ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16} />}
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;