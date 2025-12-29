import { useGetProductsQuery } from '../../redux/slices/productsApiSlice';
import ProductCard from '../shared/ProductCard';
import { Loader2 } from 'lucide-react';

const FeaturedProducts = () => {
  // The Hook automatically handles fetching, loading, and errors!
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Trending Now</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Discover our most popular supplements, formulated for peak performance and recovery.
            </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
             <Loader2 className="animate-spin text-accent" size={48} />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
             Error loading products: {error?.data?.message || error.error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;