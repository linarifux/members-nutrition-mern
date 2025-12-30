import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../redux/slices/productsApiSlice';
import { Loader2, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify'; // <--- Import Toast

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
        <div className="flex items-center gap-2 text-red-500 font-bold">
            <AlertTriangle size={18} />
            <span>Delete this product?</span>
        </div>
        <div className="flex gap-3 justify-end">
            <button 
                className="text-gray-500 text-sm hover:text-gray-700 font-medium px-2"
                onClick={closeToast}
            >
                Cancel
            </button>
            <button 
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold hover:bg-red-600 shadow-sm"
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
        autoClose: false, // Keep open until clicked
        closeButton: false, // Remove default X
        position: "top-center" // Show prominently
    });
  };

  const createProductHandler = () => {
    navigate('/admin/product/create');
  };

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-10" />;
  if (error) return <div className="text-red-500 text-center mt-10">{error?.data?.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Products</h1>
        <button 
          onClick={createProductHandler}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <Plus size={20} /> Create Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-sm text-gray-500">ID</th>
              <th className="p-4 font-bold text-sm text-gray-500">NAME</th>
              <th className="p-4 font-bold text-sm text-gray-500">RETAIL PRICE</th>
              <th className="p-4 font-bold text-sm text-gray-500">WHOLESALE</th>
              <th className="p-4 font-bold text-sm text-gray-500">CATEGORY</th>
              <th className="p-4 font-bold text-sm text-gray-500">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="p-4 font-mono text-xs text-gray-400">{product._id.substring(product._id.length - 6)}...</td>
                <td className="p-4 font-medium text-primary">
                    {product.name}
                    {/* Visual indicator for featured/archived */}
                    {product.isFeatured && <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">Featured</span>}
                    {product.isArchived && <span className="ml-2 text-[10px] bg-gray-200 text-gray-500 px-1 rounded">Archived</span>}
                </td>
                <td className="p-4">${product.basePriceRetail}</td>
                <td className="p-4 text-accent font-bold">${product.basePriceWholesale}</td>
                <td className="p-4 text-sm text-gray-500">{product.category}</td>
                <td className="p-4 flex gap-2">
                  <Link to={`/admin/product/${product._id}/edit`} className="p-2 bg-gray-100 rounded hover:bg-primary hover:text-white transition">
                    <Edit size={16} />
                  </Link>
                  <button 
                    onClick={() => deleteHandler(product._id)}
                    className="p-2 bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    disabled={loadingDelete}
                  >
                    {loadingDelete ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;