import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image || 'https://placehold.co/600x400'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Wholesale Badge (Logic to show only if needed can be added later) */}
        {product.isWholesaleOnly && (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                Wholesale
            </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Price Row */}
        <div className="flex items-center justify-between mt-3">
            <div>
                <span className="text-gray-400 text-sm">From</span>
                <p className="text-lg font-bold text-primary">${product.basePriceRetail}</p>
            </div>
            
            <button className="bg-gray-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors">
                <ShoppingCart size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;