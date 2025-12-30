import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import ProductCard from '../shared/ProductCard';
import { Loader2, Sparkles } from 'lucide-react';

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // Filter for 'isFeatured' products. 
  // If none are featured yet, just show the top 4 as a fallback.
  const featuredList = products 
    ? (products.some(p => p.isFeatured) 
        ? products.filter(p => p.isFeatured) 
        : products.slice(0, 4))
    : [];

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
               <Sparkles className="text-accent" size={32} />
               Trending <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-orange-500">Now</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
               Discover our most popular formulations, engineered for elite performance.
            </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
             <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-950/30 p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm max-w-lg mx-auto">
             Error loading products: {error?.data?.message || error.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;