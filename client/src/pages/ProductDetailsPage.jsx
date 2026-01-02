import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  useGetProductDetailsQuery, 
  useCreateReviewMutation 
} from '../redux/slices/productsApiSlice';
import { addToCart, toggleCartDrawer } from '../redux/slices/cartSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
  ArrowLeft, Minus, Plus, ShoppingBag, Loader2, Check, AlertCircle, 
  User as UserIcon, Star, MessageSquare 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Rating from '../components/shared/Rating';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  // Queries & Mutations
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  
  // Local State
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [qty, setQty] = useState(1);
  const [activeVariant, setActiveVariant] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  
  // Review State
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth); 
  const isWholesaleUser = userInfo?.role === 'wholesale';

  // EFFECT: Set default options & image when product loads
  useEffect(() => {
    if (product) {
      if (product.images && product.images.length > 0) {
        setActiveImage(product.images[0]);
      } else {
        setActiveImage(product.image || '');
      }

      if (product.options && product.options.length > 0) {
        const defaults = {};
        product.options.forEach(opt => {
          defaults[opt.name] = opt.values[0];
        });
        setSelectedOptions(defaults);
      }
    }
  }, [product]);

  // EFFECT: Find specific variant
  useEffect(() => {
    if (product && product.variants && Object.keys(selectedOptions).length > 0) {
      const found = product?.variants?.find(variant => {
        return Object.entries(selectedOptions).every(
          ([key, value]) => variant.attributes && variant.attributes[key] === value
        );
      });
      setActiveVariant(found);
    }
  }, [product, selectedOptions]);

  // HANDLERS
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const addToCartHandler = () => {
    let finalPrice = isWholesaleUser ? product.basePriceWholesale : product.basePriceRetail;

    if (activeVariant) {
        finalPrice = isWholesaleUser ? activeVariant.priceWholesale : activeVariant.priceRetail;
    }

    const finalSku = activeVariant ? activeVariant.sku : product._id; 
    const finalStock = activeVariant ? activeVariant.countInStock : product.countInStock;

    dispatch(addToCart({
        product: product._id,
        name: product.name,
        image: activeImage, 
        price: finalPrice,
        countInStock: finalStock,
        qty,
        sku: finalSku,
        selectedOptions
    }));

    toast.success('Added to Cart');
    dispatch(toggleCartDrawer(true));
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48}/></div>;
  if (error) return <div className="text-center py-20 text-red-400">Error: {error?.data?.message || error.error}</div>;

  // Render Helpers
  const currentRetailPrice = activeVariant ? activeVariant.priceRetail : product.basePriceRetail;
  const currentWholesalePrice = activeVariant ? activeVariant.priceWholesale : product.basePriceWholesale;
  const currentStock = activeVariant ? activeVariant.countInStock : product.countInStock;
  const isOutOfStock = currentStock === 0;
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image]; 

  return (
    <div className="min-h-screen relative overflow-hidden pt-10 pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Shop
        </Link>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* LEFT: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-black/20 border border-white/10 relative group shadow-2xl">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {currentStock < 10 && currentStock > 0 && (
                    <span className="absolute top-4 left-4 bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30 backdrop-blur-md">
                        Low Stock: Only {currentStock} left!
                    </span>
                )}
            </div>
            
            {galleryImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {galleryImages.map((img, index) => (
                      <button 
                          key={index} 
                          onClick={() => setActiveImage(img)}
                          className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                              activeImage === img 
                                ? 'border-accent shadow-[0_0_15px_rgba(249,115,22,0.3)] scale-105' 
                                : 'border-transparent hover:border-white/30 bg-black/20'
                          }`}
                      >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                  ))}
                </div>
            )}
          </motion.div>

          {/* RIGHT: Details */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-start mb-2">
               <div className="text-sm text-accent font-bold uppercase tracking-wider">{product.brand}</div>
               {product.subCategory && <div className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded border border-white/5">{product.subCategory}</div>}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
              <span className="text-gray-600">|</span>
              <span className={`text-sm font-medium ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`}>
                  {isOutOfStock ? 'Out of Stock' : 'In Stock'}
              </span>
            </div>

            {/* PRICING */}
            <div className="p-6 glass-panel rounded-2xl border border-white/10 mb-8">
              <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-white">
                      ${isWholesaleUser ? currentWholesalePrice : currentRetailPrice}
                  </span>
                  <span className="text-gray-400 mb-1 text-sm font-medium">
                      {isWholesaleUser ? 'Wholesale Price' : 'Retail Price'}
                  </span>
              </div>
              
              {!isWholesaleUser && (
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 mt-3">
                      <div className="bg-blue-600 text-white p-1 rounded shadow-lg shadow-blue-500/20">
                          <Check size={14} />
                      </div>
                      <div>
                          <span className="font-bold text-lg">${currentWholesalePrice}</span>
                          <span className="text-xs text-blue-400 ml-1 uppercase font-bold">Wholesale Available</span>
                      </div>
                      <div className="ml-auto text-xs text-blue-300 font-medium">
                          Save ${(currentRetailPrice - currentWholesalePrice).toFixed(2)}
                      </div>
                  </div>
              )}
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 border-b border-white/10 pb-8">
              {product.description}
            </p>

            {/* VARIANTS */}
            <div className="space-y-6 mb-8">
              {product.options && product.options.map((option) => (
                  <div key={option.name}>
                      <label className="block text-sm font-bold text-gray-200 mb-3">
                          Select {option.name}: <span className="text-accent font-normal">{selectedOptions[option.name]}</span>
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
                                              ? 'border-accent bg-accent text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                                              : 'border-white/10 text-gray-400 hover:border-white/30 bg-black/20 hover:bg-white/5'
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

            {/* CART ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
               <div className="flex items-center border border-white/10 rounded-full h-14 w-fit px-4 bg-black/20">
                  <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                      disabled={isOutOfStock}
                  >
                      <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-white">{qty}</span>
                  <button 
                      onClick={() => setQty(Math.min(currentStock || 10, qty + 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                      disabled={isOutOfStock}
                  >
                      <Plus size={18} />
                  </button>
               </div>

               <button 
                  onClick={addToCartHandler}
                  disabled={isOutOfStock}
                  className={`
                      flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl
                      ${isOutOfStock 
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-white/5' 
                          : 'bg-accent text-white hover:bg-orange-600 shadow-accent/20 btn-glow active:scale-95'
                      }
                  `}
               >
                  <ShoppingBag size={20} />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
               </button>
            </div>
            
            <div className="mt-6 flex gap-3 text-sm text-gray-400 bg-white/5 border border-white/5 p-4 rounded-xl">
               <AlertCircle size={20} className="text-gray-500 shrink-0" />
               <p>
                   Orders over $500 qualify for free shipping. 
                   {!isWholesaleUser && <Link to="/login" className="text-accent hover:underline ml-1 font-bold">Log in</Link>} to check wholesale status.
               </p>
            </div>
          </motion.div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-16 pt-10 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
                
                {/* 1. Review List */}
                <div className="space-y-6">
                    {product?.reviews?.length === 0 && (
                        <div className="p-6 glass-panel rounded-xl text-gray-400 italic border border-white/5">
                            No reviews yet. Be the first to write one!
                        </div>
                    )}
                    {product?.reviews?.map((review) => (
                        <div key={review._id} className="glass-panel p-6 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                        <UserIcon size={20} />
                                    </div>
                                    <div>
                                        <strong className="text-white block">{review.name}</strong>
                                        <span className="text-xs text-gray-500">{review.createdAt.substring(0, 10)}</span>
                                    </div>
                                </div>
                                <Rating value={review.rating} />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* 2. Write Review Form */}
                <div>
                    <div className="glass-panel p-8 rounded-2xl border border-white/10 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageSquare className="text-accent" size={20} /> Write a Review
                        </h3>
                        
                        {userInfo ? (
                            <form onSubmit={submitReviewHandler} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`p-2 rounded-lg transition-all ${rating >= star ? 'text-orange-500 bg-orange-500/10' : 'text-gray-600 bg-white/5 hover:bg-white/10'}`}
                                            >
                                                <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-400 mb-2">Comment</label>
                                    <textarea 
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="glass-input w-full p-3 rounded-xl bg-black/20 focus:ring-1 focus:ring-accent text-white"
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loadingProductReview}
                                    className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    {loadingProductReview ? <Loader2 className="animate-spin mx-auto"/> : 'Submit Review'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-400 mb-4">Please log in to write a review.</p>
                                <Link to="/login" className="text-accent font-bold hover:underline">Log In Here</Link>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;