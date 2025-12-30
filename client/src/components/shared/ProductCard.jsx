import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isWholesaleUser = userInfo?.role === 'wholesale';

  // Helper for image array
  const mainImage = product.images && product.images.length > 0 
      ? product.images[0] 
      : (product.image || 'https://placehold.co/600x400');

  return (
    // GLASS PANEL CARD
    <div className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col h-full hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500">
      
      {/* Image Area - Darker background for contrast */}
      <Link to={`/product/${product._id}`} className="block relative h-72 overflow-hidden bg-black/40 p-6 flex items-center justify-center">
        <img 
          src={mainImage} 
          alt={product.name} 
          className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 ease-out"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            {product.isFeatured && (
                <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md uppercase tracking-wider flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured
                </span>
            )}
            {isWholesaleUser && (
                <span className="bg-accent/20 text-accent border border-accent/30 text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md uppercase tracking-wider">
                    Wholesale
                </span>
            )}
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 relative">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{product.category}</p>
                <div className="flex gap-0.5">
                    {/* Simplified Rating Dots for style */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${i < Math.round(product.rating) ? 'bg-accent' : 'bg-gray-700'}`} />
                    ))}
                </div>
            </div>
            
            <Link to={`/product/${product._id}`} className="block mb-4">
              <h3 className="text-lg font-bold text-white leading-snug group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </Link>
            
            {/* Price & Action */}
            <div className="mt-auto flex items-center justify-between">
                <div>
                    {isWholesaleUser ? (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 line-through">${product.basePriceRetail}</span>
                            <span className="text-xl font-bold text-accent drop-shadow-lg">${product.basePriceWholesale}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Retail</span>
                            <span className="text-xl font-bold text-white">${product.basePriceRetail}</span>
                        </div>
                    )}
                </div>
                
                <Link 
                    to={`/product/${product._id}`}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 group/btn"
                >
                    <Eye size={18} className="group-hover/btn:scale-110" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;