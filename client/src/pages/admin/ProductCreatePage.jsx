import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/slices/productsApiSlice';
import { Loader2, ArrowLeft, Upload, Save, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  // --- Form State ---
  const [name, setName] = useState('');
  const [priceRetail, setPriceRetail] = useState(0);
  const [priceWholesale, setPriceWholesale] = useState(0);
  // Changed: Now an array for multiple images
  const [images, setImages] = useState([]); 
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState(''); // New Field
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  // New Boolean Fields
  const [isFeatured, setIsFeatured] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const [options, setOptions] = useState([]);
  const [variants, setVariants] = useState([]);

  // --- Image Handlers ---
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      // Append new image to the existing array
      setImages([...images, res.image]); 
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeImageHandler = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // --- Submit Handler ---
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Map form state to Mongoose Schema keys
      await createProduct({
        name,
        basePriceRetail: priceRetail,       // Schema key
        basePriceWholesale: priceWholesale, // Schema key
        images,                             // Array of strings
        brand,
        category,
        subCategory,
        description,
        countInStock,
        isFeatured,
        isArchived,
        options,
        variants
      }).unwrap();
      
      toast.success('Product created successfully');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // --- Option & Variant Helpers ---
  const handleAddOption = () => setOptions([...options, { name: '', values: [] }]);
  const handleRemoveOption = (index) => setOptions(options.filter((_, i) => i !== index));
  
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    if (field === 'values') {
      newOptions[index][field] = value.split(',').map(v => v.trim());
    } else {
      newOptions[index][field] = value;
    }
    setOptions(newOptions);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { 
      sku: '', 
      priceRetail: priceRetail || 0, 
      priceWholesale: priceWholesale || 0, 
      countInStock: 0, 
      attributes: {} 
    }]);
  };
  const handleRemoveVariant = (index) => setVariants(variants.filter((_, i) => i !== index));
  
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link to="/admin/productlist" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <h1 className="text-3xl font-bold text-primary mb-8">Create New Product</h1>

      <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-lg text-gray-800 border-b border-gray-100 pb-2">Basic Information</h2>
              
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                 <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Organic Whey Protein" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Brand</label>
                    <input type="text" required value={brand} onChange={e => setBrand(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Brand Name" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                    <input type="text" required value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Category" />
                </div>
              </div>

              {/* Sub Category Field */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Sub Category</label>
                 <input type="text" value={subCategory} onChange={e => setSubCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Men's Health" />
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                 <textarea rows={5} required value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Product details..." />
              </div>
           </div>

           {/* Variants Section */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                 <h2 className="font-bold text-lg text-gray-800">Options & Variants</h2>
                 <button type="button" onClick={handleAddOption} className="text-sm text-accent font-bold flex items-center gap-1 hover:text-orange-600 transition-colors"><Plus size={16}/> Add Option</button>
              </div>

              {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex-1">
                          <input placeholder="Option Name (e.g. Size)" value={opt.name} onChange={(e) => handleOptionChange(idx, 'name', e.target.value)} className="w-full p-2 border rounded mb-2 text-sm focus:outline-none focus:border-primary transition-colors" />
                          <input placeholder="Values (comma separated: S, M, L)" value={opt.values.join(', ')} onChange={(e) => handleOptionChange(idx, 'values', e.target.value)} className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary transition-colors" />
                      </div>
                      <button type="button" onClick={() => handleRemoveOption(idx)} className="text-red-400 hover:text-red-600 mt-2 transition-colors"><Trash2 size={18}/></button>
                  </div>
              ))}

              <div className="flex justify-between items-center border-b border-gray-100 pb-2 pt-4">
                 <h2 className="font-bold text-lg text-gray-800">Variants (SKUs)</h2>
                 <button type="button" onClick={handleAddVariant} className="text-sm text-accent font-bold flex items-center gap-1 hover:text-orange-600 transition-colors"><Plus size={16}/> Add SKU</button>
              </div>
              
              <div className="space-y-4">
                  {variants.map((variant, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between mb-3 border-b border-gray-200 pb-2">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Variant #{idx + 1}</span>
                              <button type="button" onClick={() => handleRemoveVariant(idx)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-gray-400">SKU</label>
                                <input placeholder="SKU-123" value={variant.sku} onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)} className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Retail $</label>
                                <input type="number" placeholder="0.00" value={variant.priceRetail} onChange={(e) => handleVariantChange(idx, 'priceRetail', Number(e.target.value))} className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Wholesale $</label>
                                <input type="number" placeholder="0.00" value={variant.priceWholesale} onChange={(e) => handleVariantChange(idx, 'priceWholesale', Number(e.target.value))} className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-gray-400">Stock</label>
                                <input type="number" placeholder="0" value={variant.countInStock} onChange={(e) => handleVariantChange(idx, 'countInStock', Number(e.target.value))} className="w-full p-2 border rounded text-sm focus:outline-none focus:border-primary" />
                              </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-gray-100">
                            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Variant Attributes</label>
                            <div className="flex flex-wrap gap-2">
                                {options.map(opt => (
                                    <div key={opt.name} className="flex items-center gap-2 bg-gray-50 border px-3 py-1.5 rounded text-sm">
                                        <span className="font-bold text-gray-700">{opt.name}:</span>
                                        <select 
                                          className="bg-transparent outline-none cursor-pointer text-gray-600"
                                          value={variant.attributes ? variant.attributes[opt.name] : ''}
                                          onChange={(e) => handleVariantAttributeChange(idx, opt.name, e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            {opt.values.map(val => <option key={val} value={val}>{val}</option>)}
                                        </select>
                                    </div>
                                ))}
                                {options.length === 0 && <span className="text-xs text-gray-400 italic">Add options above to configure attributes</span>}
                            </div>
                          </div>
                      </div>
                  ))}
                  {variants.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
                        <p>No variants added yet.</p>
                        <button type="button" onClick={handleAddVariant} className="text-accent font-bold hover:underline mt-1 text-sm">Add your first SKU</button>
                    </div>
                  )}
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
            <button type="submit" disabled={loadingCreate} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 sticky top-24 active:scale-95">
                {loadingCreate ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Create Product</>}
            </button>

            {/* Visibility Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h2 className="font-bold text-lg text-gray-800">Visibility</h2>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-5 h-5 accent-accent rounded" />
                    <span className="font-medium text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input type="checkbox" checked={isArchived} onChange={e => setIsArchived(e.target.checked)} className="w-5 h-5 accent-red-500 rounded" />
                    <span className="font-medium text-gray-700">Archived (Hidden)</span>
                </label>
            </div>

            {/* Image Gallery */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-bold text-lg text-gray-800 mb-4">Product Images</h2>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                            <img src={img} alt={`Product ${index}`} className="w-full h-full object-cover" />
                            <button 
                                type="button" 
                                onClick={() => removeImageHandler(index)}
                                className="absolute top-1 right-1 bg-white/90 text-red-500 p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    
                    <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-colors">
                        {loadingUpload ? <Loader2 className="animate-spin text-gray-400" /> : <Plus size={24} className="text-gray-400" />}
                        <span className="text-xs font-bold text-gray-500">Add Image</span>
                        <input type="file" onChange={uploadFileHandler} className="hidden" />
                    </label>
                </div>
                <p className="text-xs text-gray-400 text-center">First image is the main cover.</p>
            </div>

            {/* Base Pricing */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h2 className="font-bold text-lg text-gray-800">Base Pricing</h2>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Retail Price ($)</label>
                    <input type="number" required value={priceRetail} onChange={e => setPriceRetail(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-accent uppercase">Wholesale Price ($)</label>
                    <input type="number" required value={priceWholesale} onChange={e => setPriceWholesale(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Total Stock</label>
                    <input type="number" required value={countInStock} onChange={e => setCountInStock(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
            </div>
        </div>

      </form>
    </div>
  );
};

export default ProductCreatePage;