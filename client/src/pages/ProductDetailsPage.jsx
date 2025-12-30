import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../redux/slices/productsApiSlice';
import { addToCart } from '../redux/slices/cartSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Minus, Plus, ShoppingBag, Loader2, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Rating from '../components/shared/Rating';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  // Local State
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [qty, setQty] = useState(1);
  const [activeVariant, setActiveVariant] = useState(null);
  const [activeImage, setActiveImage] = useState(''); // State for Gallery

  const { userInfo } = useSelector((state) => state.auth); 
  const isWholesaleUser = userInfo?.role === 'wholesale';

  // EFFECT: Set default options & image when product loads
  useEffect(() => {
    if (product) {
      // 1. Set Default Image
      if (product.images && product.images.length > 0) {
        setActiveImage(product.images[0]);
      } else {
        setActiveImage(product.image || ''); // Fallback for legacy data
      }

      // 2. Set Default Options
      if (product.options && product.options.length > 0) {
        const defaults = {};
        product.options.forEach(opt => {
          defaults[opt.name] = opt.values[0];
        });
        setSelectedOptions(defaults);
      }
    }
  }, [product]);

  // EFFECT: Find specific variant when options change
  useEffect(() => {
    if (product && product.variants && Object.keys(selectedOptions).length > 0) {
      const found = product.variants.find(variant => {
        return Object.entries(selectedOptions).every(
          ([key, value]) => variant.attributes && variant.attributes[key] === value
        );
      });
      setActiveVariant(found);
    }
  }, [product, selectedOptions]);

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const addToCartHandler = () => {
    // Determine Price based on User Role or Variant
    // If Wholesale User -> Use Wholesale Price. Else Retail.
    let finalPrice = isWholesaleUser ? product.basePriceWholesale : product.basePriceRetail;

    // If Variant exists, override with Variant Price
    if (activeVariant) {
        finalPrice = isWholesaleUser ? activeVariant.priceWholesale : activeVariant.priceRetail;
    }

    const finalSku = activeVariant ? activeVariant.sku : product._id; 
    const finalStock = activeVariant ? activeVariant.countInStock : product.countInStock;

    dispatch(addToCart({
        product: product._id,
        name: product.name,
        image: activeImage, // Use currently visible image
        price: finalPrice,
        countInStock: finalStock,
        qty,
        sku: finalSku,
        selectedOptions
    }));
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48}/></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error?.data?.message || error.error}</div>;

  // Prices for Display
  const currentRetailPrice = activeVariant ? activeVariant.priceRetail : product.basePriceRetail;
  const currentWholesalePrice = activeVariant ? activeVariant.priceWholesale : product.basePriceWholesale;
  const currentStock = activeVariant ? activeVariant.countInStock : product.countInStock;
  const isOutOfStock = currentStock === 0;

  // Normalize Images Array for Gallery
  const galleryImages = product.images && product.images.length > 0 
      ? product.images 
      : [product.image]; // Fallback to single image array

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Browse
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative group">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {currentStock < 10 && currentStock > 0 && (
                  <span className="absolute top-4 left-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 shadow-sm">
                     Low Stock: Only {currentStock} left!
                  </span>
              )}
          </div>
          
          {/* Thumbnail Gallery */}
          {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {galleryImages.map((img, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveImage(img)}
                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                            activeImage === img ? 'border-accent shadow-md scale-105' : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
              </div>
          )}
        </motion.div>


        {/* RIGHT COLUMN: Details & Actions */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-2">
             <div className="text-sm text-accent font-bold uppercase tracking-wider">{product.brand}</div>
             {product.subCategory && <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.subCategory}</div>}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
            <span className="text-gray-300">|</span>
            <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
            </span>
          </div>

          {/* PRICING BLOCK */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm mb-8">
            <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                    ${isWholesaleUser ? currentWholesalePrice : currentRetailPrice}
                </span>
                <span className="text-gray-400 mb-1 text-sm font-medium">
                    {isWholesaleUser ? 'Wholesale Price' : 'Retail Price'}
                </span>
            </div>
            
            {/* Wholesale Upsell (Only show if NOT wholesale user) */}
            {!isWholesaleUser && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 mt-3">
                    <div className="bg-blue-600 text-white p-1 rounded">
                        <Check size={14} />
                    </div>
                    <div>
                        <span className="font-bold text-lg">${currentWholesalePrice}</span>
                        <span className="text-xs text-blue-600 ml-1 uppercase font-bold">Wholesale Available</span>
                    </div>
                    <div className="ml-auto text-xs text-blue-500 font-medium">
                        Save ${(currentRetailPrice - currentWholesalePrice).toFixed(2)}
                    </div>
                </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
            {product.description}
          </p>

          {/* VARIANT SELECTORS */}
          <div className="space-y-6 mb-8">
            {product.options && product.options.map((option) => (
                <div key={option.name}>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                        Select {option.name}: <span className="text-gray-400 font-normal">{selectedOptions[option.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {option.values.map((val) => {
                            const isSelected = selectedOptions[option.name] === val;
                            return (
                                <button
                                    key={val}
                                    onClick={() => handleOptionChange(option.name, val)}
                                    className={`
                                        px-6 py-2 rounded-lg border text-sm font-medium transition-all
                                        ${isSelected 
                                            ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20' 
                                            : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                                        }
                                    `}
                                >
                                    {val}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
          </div>

          {/* ACTIONS ROW */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
             {/* Quantity Counter */}
             <div className="flex items-center border border-gray-200 rounded-full h-14 w-fit px-4 bg-white">
                <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
                    disabled={isOutOfStock}
                >
                    <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                <button 
                    onClick={() => setQty(Math.min(currentStock || 10, qty + 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
                    disabled={isOutOfStock}
                >
                    <Plus size={18} />
                </button>
             </div>

             {/* Add to Cart Button */}
             <button 
                onClick={addToCartHandler}
                disabled={isOutOfStock}
                className={`
                    flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl
                    ${isOutOfStock 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-accent text-white hover:bg-orange-600 hover:shadow-orange-500/30 active:scale-95'
                    }
                `}
             >
                <ShoppingBag size={20} />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
             </button>
          </div>
          
          {/* Wholesale Info Note */}
          <div className="mt-6 flex gap-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
             <AlertCircle size={20} className="text-gray-400 shrink-0" />
             <p>
                 Orders over $500 qualify for free shipping. 
                 {!isWholesaleUser && <Link to="/login" className="text-accent hover:underline ml-1 font-bold">Log in</Link>} to check wholesale status.
             </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;