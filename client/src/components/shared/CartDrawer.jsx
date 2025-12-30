import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeFromCart, toggleCartDrawer } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  
  // Get Cart Data
  const { cartItems, isCartOpen, itemsPrice } = useSelector((state) => state.cart);
  
  // Get Auth Data
  const { userInfo } = useSelector((state) => state.auth);

  const closeCart = () => dispatch(toggleCartDrawer(false));

  // Determine Checkout Path
  const checkoutDestination = userInfo ? '/shipping' : '/login?redirect=/shipping';

  // Calculate Subtotal dynamically if not provided by store
  const subtotal = itemsPrice || cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen]);

  // Use createPortal to render outside the main DOM hierarchy
  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. Backdrop (Click to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* 2. The Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <ShoppingBag size={20} className="text-accent" /> 
                Your Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              <button 
                onClick={closeCart} 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag size={64} className="opacity-10" />
                  <p>Your cart is empty.</p>
                  <button onClick={closeCart} className="text-accent font-bold hover:underline">
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.sku} className="flex gap-4 group">
                    {/* Image */}
                    <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-gray-200 line-clamp-1">{item.name}</h3>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.sku))}
                            className="text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Options Display */}
                        <p className="text-xs text-gray-500 mb-1 mt-1">
                           {Object.values(item.selectedOptions || {}).join(' / ')}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded">
                            Qty: {item.qty}
                        </span>
                        <span className="font-bold text-accent text-lg">
                            ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-white">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold">${subtotal}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2 text-center">
                    Shipping & taxes calculated at checkout.
                </p>
                
                <Link 
                  to={checkoutDestination}
                  onClick={closeCart}
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-accent/20 btn-glow"
                >
                  Checkout Now <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body // Portal Target
  );
};

export default CartDrawer;