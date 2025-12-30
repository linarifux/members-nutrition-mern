import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Search, LogOut, ChevronDown, Package, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartDrawer } from '../../redux/slices/cartSlice';
import { logout } from '../../redux/slices/authSlice';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate('/login');
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-lg py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-orange-600 text-white flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              MEMBERS<span className="text-accent">NUTRITION</span>
            </span>
          </Link>

          {/* 2. Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            {['Home', 'Shop', 'Wholesale', 'About'].map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                return (
                    <Link 
                        key={item} 
                        to={path} 
                        className={`hover:text-white transition-colors relative group ${isActiveLink(path) ? 'text-white' : ''}`}
                    >
                        {item}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActiveLink(path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </Link>
                );
            })}
          </div>

          {/* 3. Icons */}
          <div className="hidden md:flex items-center space-x-6 z-50">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            
            {/* Cart Button */}
            <button 
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-accent/40 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown */}
            {userInfo ? (
                <div className="relative" ref={profileRef}>
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-200 hover:text-accent transition-colors"
                    >
                        <span>{userInfo.name.split(' ')[0]}</span>
                        <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-4 w-56 bg-[#1a1a1a] backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                                    <p className="text-xs text-gray-400">Signed in as</p>
                                    <p className="text-sm font-bold text-white truncate">{userInfo.email}</p>
                                </div>
                                
                                <div className="py-1">
                                    {userInfo.role === 'admin' && (
                                        // UPDATED LINK: Points to Dashboard Overview
                                        <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-accent transition-colors">
                                            <LayoutDashboard size={16} /> Admin Dashboard
                                        </Link>
                                    )}
                                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                                        <User size={16} /> My Profile
                                    </Link>
                                    <Link to="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                                        <Package size={16} /> Orders
                                    </Link>
                                </div>

                                <div className="border-t border-white/10 py-1">
                                    <button 
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 text-left transition-colors"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link to="/login" className="flex items-center gap-2 bg-white/10 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-accent hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-95">
                    <User size={16} />
                    <span>Login</span>
                </Link>
            )}
          </div>

          {/* 4. Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 top-0 z-40 bg-black/95 backdrop-blur-xl pt-28 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {['Home', 'Shop', 'Wholesale', 'About'].map((link) => (
                  <Link 
                    key={link}
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-gray-300 hover:text-accent transition-colors border-b border-white/10 pb-4"
                  >
                    {link}
                  </Link>
              ))}
              
              <div className="pt-4 space-y-4">
                {userInfo ? (
                   <>
                      {userInfo.role === 'admin' && (
                          // UPDATED LINK: Points to Dashboard Overview
                          <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg text-gray-300">
                              <LayoutDashboard size={20} className="text-accent" /> Admin Dashboard
                          </Link>
                      )}
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg text-gray-300">
                          <User size={20} className="text-accent" /> My Profile
                      </Link>
                      <button onClick={logoutHandler} className="flex items-center gap-3 text-red-500 text-left text-lg w-full">
                          <LogOut size={20} /> Logout
                      </button>
                   </>
                ) : (
                   <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-3 bg-accent text-white py-4 rounded-xl text-lg font-bold w-full">
                      <User size={20} /> Login / Register
                   </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
};

export default Navbar;