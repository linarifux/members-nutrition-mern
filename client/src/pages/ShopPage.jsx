import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import { Loader2, Filter, X } from 'lucide-react';
import ProductCard from '../components/shared/ProductCard';

const ShopPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get params from URL
  const keyword = queryParams.get('search') || '';
  const categoryParam = queryParams.get('category') || '';
  const pageParam = queryParams.get('page') || 1;

  // Local state for filters
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch Data
  const { data, isLoading, error } = useGetProductsQuery({ 
    keyword, 
    pageNumber: pageParam,
    category: activeCategory 
  });

  const categories = ["Protein", "Vitamins", "Pre-Workout", "Accessories", "Recovery"]; // Hardcoded for now, or fetch from DB

  const handleCategoryClick = (cat) => {
    // Toggle: If clicking active category, clear it.
    const newCat = activeCategory === cat ? '' : cat;
    setActiveCategory(newCat);
    
    // Update URL without reloading
    const params = new URLSearchParams(location.search);
    if(newCat) params.set('category', newCat);
    else params.delete('category');
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    {keyword ? `Results for "${keyword}"` : 'Shop All Products'}
                </h1>
                <p className="text-gray-400">
                    {data?.products?.length} items found
                </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button 
                className="md:hidden flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg"
                onClick={() => setMobileFilterOpen(true)}
            >
                <Filter size={18} /> Filters
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            
            {/* SIDEBAR FILTERS (Desktop) */}
            <aside className={`
                fixed md:static inset-0 z-50 bg-black/95 md:bg-transparent p-8 md:p-0 w-full md:w-64 transition-transform duration-300
                ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex justify-between items-center md:hidden mb-8">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button onClick={() => setMobileFilterOpen(false)} className="text-white"><X /></button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={() => handleCategoryClick('')}
                            className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeCategory === '' ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            All Products
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`block w-full text-left py-2 px-3 rounded-lg transition-colors ${activeCategory === cat ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
                {isLoading ? (
                    <div className="flex justify-center pt-20"><Loader2 className="animate-spin text-accent" size={48} /></div>
                ) : error ? (
                    <div className="text-red-400 text-center pt-20">{error?.data?.message || 'Error loading products'}</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {data.products.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                <p>No products found matching your criteria.</p>
                                <button onClick={() => {navigate('/shop'); setActiveCategory('')}} className="text-accent hover:underline mt-2">Clear Filters</button>
                            </div>
                        )}
                        
                        {/* Simple Pagination (Next/Prev) */}
                        {data.pages > 1 && (
                            <div className="flex justify-center mt-12 gap-2">
                                {[...Array(data.pages).keys()].map((x) => (
                                    <button
                                        key={x + 1}
                                        onClick={() => navigate(`/shop?page=${x + 1}${keyword ? `&search=${keyword}` : ''}${activeCategory ? `&category=${activeCategory}` : ''}`)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                            Number(data.page) === x + 1 
                                                ? 'bg-accent text-white' 
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                    >
                                        {x + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default ShopPage;