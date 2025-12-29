import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartDrawer } from '../../redux/slices/cartSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redux: Get cart data and dispatch actions
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total quantity of items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Detect scroll to adjust navbar style dynamically
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-md border-gray-200 shadow-sm py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full font-bold text-xl group-hover:bg-accent transition-colors">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              MEMBERS<span className="font-light">NUTRITION</span>
            </span>
          </Link>

          {/* 2. Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-accent transition-colors">All Products</Link>
            <Link to="/wholesale" className="hover:text-accent transition-colors">Wholesale Portal</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Our Story</Link>
          </div>

          {/* 3. Icons (Search, Cart, Profile) */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="text-gray-600 hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            
            {/* Cart Button - Opens Drawer */}
            <button 
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="relative text-gray-600 hover:text-accent transition-colors"
            >
              <ShoppingBag size={20} />
              {/* Dynamic Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link to="/login" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-transform active:scale-95">
              <User size={16} />
              <span>Login</span>
            </Link>
          </div>

          {/* 4. Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* 5. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-xl pt-10 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-xl font-medium text-primary">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
              <Link to="/wholesale" onClick={() => setIsMobileMenuOpen(false)}>Wholesale</Link>
              <hr className="border-gray-200" />
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <User size={20} /> Login / Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;