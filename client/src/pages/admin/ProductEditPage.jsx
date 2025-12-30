import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  useGetProductDetailsQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from '../../redux/slices/productsApiSlice';
import { Loader2, ArrowLeft, Save, Plus, Trash2, X, Eye } from 'lucide-react';
import { toast } from 'react-toastify'; 
import AdminSidebar from '../../components/admin/AdminSidebar'; // Import Sidebar

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  // --- Form State ---
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [priceRetail, setPriceRetail] = useState(0);
  const [priceWholesale, setPriceWholesale] = useState(0);
  const [images, setImages] = useState([]); 
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState(''); 
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  
  const [options, setOptions] = useState([]); 
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSlug(product.slug || '');
      setPriceRetail(product.basePriceRetail || 0);
      setPriceWholesale(product.basePriceWholesale || 0);
      
      if (product.images && product.images.length > 0) {
          setImages(product.images);
      } else if (product.image) {
          setImages([product.image]);
      } else {
          setImages([]);
      }

      setBrand(product.brand || '');
      setCategory(product.category || '');
      setSubCategory(product.subCategory || '');
      setCountInStock(product.countInStock || 0);
      setDescription(product.description || '');
      setIsFeatured(product.isFeatured || false);
      setIsArchived(product.isArchived || false);
      setOptions(product.options || []);
      setVariants(product.variants || []);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImages([...images, res.image]); 
      toast.success('Image uploaded'); 
    } catch (err) {
      toast.error(err?.data?.message || err.error); 
    }
  };

  const removeImageHandler = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        slug,
        basePriceRetail: priceRetail,
        basePriceWholesale: priceWholesale,
        images,
        brand,
        category,
        subCategory,
        description,
        countInStock,
        options,
        variants,
        isFeatured,
        isArchived
      }).unwrap();
      toast.success('Product updated'); 
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error); 
    }
  };

  // --- Variant & Option Helpers ---
  const handleAddOption = () => {
    setOptions([...options, { name: '', values: [] }]);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    if (field === 'values') {
      newOptions[index][field] = value.split(',').map(v => v.trim());
    } else {
      newOptions[index][field] = value;
    }
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  
  const handleVariantAttributeChange = (index, key, value) => {
      const newVariants = [...variants];
      const currentAttrs = newVariants[index].attributes || {};
      newVariants[index].attributes = { ...currentAttrs, [key]: value };
      setVariants(newVariants);
  };

  const handleAddVariant = () => {
      setVariants([...variants, {
          sku: '',
          priceRetail: priceRetail,
          priceWholesale: priceWholesale,
          countInStock: 0,
          attributes: {}
      }]);
  };

  const handleRemoveVariant = (index) => {
      setVariants(variants.filter((_, i) => i !== index));
  };


  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20 text-accent" />;
  if (error) return <div className="text-red-500 text-center mt-20">{error.data?.message || 'Error'}</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <AdminSidebar />
      
      <div className="flex-1 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
            <Link to="/admin/productlist" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={18} /> Back
            </Link>
            <h1 className="text-2xl font-bold text-white">Edit Product</h1>
        </div>

        <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Main Info */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Basic Info Panel */}
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
                    <h2 className="font-bold text-lg text-white border-b border-white/10 pb-2">Basic Information</h2>
                    
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Product Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="glass-input w-full p-3 rounded-lg bg-black/20 focus:ring-1 focus:ring-accent" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">Brand</label>
                            <input type="text" value={brand} onChange={e => setBrand(e.target.value)} className="glass-input w-full p-3 rounded-lg" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="glass-input w-full p-3 rounded-lg" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Sub Category</label>
                        <input type="text" value={subCategory} onChange={e => setSubCategory(e.target.value)} className="glass-input w-full p-3 rounded-lg" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                        <textarea rows={5} value={description} onChange={e => setDescription(e.target.value)} className="glass-input w-full p-3 rounded-lg" />
                    </div>
                </div>

                {/* 2. Variants & Options Panel */}
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h2 className="font-bold text-lg text-white">Options</h2>
                        <button type="button" onClick={handleAddOption} className="text-sm text-accent font-bold flex items-center gap-1 hover:text-orange-400 transition-colors"><Plus size={16}/> Add Option</button>
                    </div>

                    {options.map((opt, idx) => (
                        <div key={idx} className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5">
                            <div className="flex-1">
                                <input 
                                    placeholder="Option Name (e.g. Size)" 
                                    value={opt.name} 
                                    onChange={(e) => handleOptionChange(idx, 'name', e.target.value)}
                                    className="glass-input w-full p-2 rounded mb-2 text-sm"
                                />
                                <input 
                                    placeholder="Values (comma separated: S, M, L)" 
                                    value={opt.values.join(', ')} 
                                    onChange={(e) => handleOptionChange(idx, 'values', e.target.value)}
                                    className="glass-input w-full p-2 rounded text-sm"
                                />
                            </div>
                            <button type="button" onClick={() => handleRemoveOption(idx)} className="text-red-400 hover:text-red-500 mt-2 transition-colors"><Trash2 size={18}/></button>
                        </div>
                    ))}

                    <div className="flex justify-between items-center border-b border-white/10 pb-2 pt-4">
                        <h2 className="font-bold text-lg text-white">Variants (SKUs)</h2>
                        <button type="button" onClick={handleAddVariant} className="text-sm text-accent font-bold flex items-center gap-1 hover:text-orange-400 transition-colors"><Plus size={16}/> Add SKU</button>
                    </div>
                    
                    <div className="space-y-4">
                        {variants.map((variant, idx) => (
                            <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <div className="flex justify-between mb-3 border-b border-white/10 pb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Variant #{idx + 1}</span>
                                    <button type="button" onClick={() => handleRemoveVariant(idx)} className="text-red-400 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400">SKU</label>
                                        <input placeholder="SKU-123" value={variant.sku} onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)} className="glass-input w-full p-2 rounded text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400">Retail $</label>
                                        <input type="number" placeholder="0.00" value={variant.priceRetail} onChange={(e) => handleVariantChange(idx, 'priceRetail', Number(e.target.value))} className="glass-input w-full p-2 rounded text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400">Wholesale $</label>
                                        <input type="number" placeholder="0.00" value={variant.priceWholesale} onChange={(e) => handleVariantChange(idx, 'priceWholesale', Number(e.target.value))} className="glass-input w-full p-2 rounded text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400">Stock</label>
                                        <input type="number" placeholder="0" value={variant.countInStock} onChange={(e) => handleVariantChange(idx, 'countInStock', Number(e.target.value))} className="glass-input w-full p-2 rounded text-sm" />
                                    </div>
                                </div>
                                
                                <div className="bg-black/20 p-3 rounded border border-white/5">
                                    <label className="text-[10px] uppercase font-bold text-gray-500 block mb-2">Attributes</label>
                                    <div className="flex flex-wrap gap-2">
                                        {options.map(opt => (
                                            <div key={opt.name} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded text-sm">
                                                <span className="font-bold text-gray-400">{opt.name}:</span>
                                                <select 
                                                    className="bg-transparent outline-none cursor-pointer text-gray-300"
                                                    value={variant.attributes ? variant.attributes[opt.name] : ''}
                                                    onChange={(e) => handleVariantAttributeChange(idx, opt.name, e.target.value)}
                                                >
                                                    <option value="" className="bg-gray-800">Select...</option>
                                                    {opt.values.map(val => <option key={val} value={val} className="bg-gray-800">{val}</option>)}
                                                </select>
                                            </div>
                                        ))}
                                        {options.length === 0 && <span className="text-xs text-gray-500 italic">Add options above to configure attributes</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {variants.length === 0 && <p className="text-sm text-gray-500 italic text-center py-4">No variants defined.</p>}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Media, Price & Save */}
            <div className="space-y-6">
                
                <button 
                    type="submit" 
                    disabled={loadingUpdate}
                    className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 sticky top-24 active:scale-95 btn-glow"
                >
                    {loadingUpdate ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Save Changes</>}
                </button>

                {/* Visibility Settings */}
                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
                    <h2 className="font-bold text-lg text-white">Visibility</h2>
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition">
                        <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-5 h-5 accent-accent rounded" />
                        <span className="font-medium text-gray-300">Featured Product</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg cursor-pointer hover:bg-white/5 transition">
                        <input type="checkbox" checked={isArchived} onChange={e => setIsArchived(e.target.checked)} className="w-5 h-5 accent-red-500 rounded" />
                        <span className="font-medium text-gray-300">Archived (Hidden)</span>
                    </label>
                </div>

                {/* Image Gallery */}
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                    <h2 className="font-bold text-lg text-white mb-4">Images</h2>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group bg-black/40">
                                <img src={img} alt={`Product ${index}`} className="w-full h-full object-cover" />
                                <button 
                                    type="button" 
                                    onClick={() => removeImageHandler(index)}
                                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 hover:border-accent transition-colors">
                            {loadingUpload ? <Loader2 className="animate-spin text-gray-400" /> : <Plus size={24} className="text-gray-400" />}
                            <span className="text-xs font-bold text-gray-500">Upload</span>
                            <input type="file" onChange={uploadFileHandler} className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-4">
                    <h2 className="font-bold text-lg text-white">Base Pricing</h2>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Retail Price ($)</label>
                        <input type="number" value={priceRetail} onChange={e => setPriceRetail(e.target.value)} className="glass-input w-full p-3 rounded-lg" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-accent uppercase">Wholesale Price ($)</label>
                        <input type="number" value={priceWholesale} onChange={e => setPriceWholesale(e.target.value)} className="glass-input w-full p-3 rounded-lg border-accent/30 focus:border-accent" />
                    </div>
                </div>

            </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;