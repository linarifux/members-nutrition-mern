import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { removeFromCart, toggleCartDrawer } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  
  // Get Cart Data
  const { cartItems, isCartOpen, itemsPrice } = useSelector((state) => state.cart);
  
  // Get Auth Data (To decide where to send the user)
  const { userInfo } = useSelector((state) => state.auth);

  const closeCart = () => dispatch(toggleCartDrawer(false));

  // Logic: If logged in -> Shipping. If not -> Login (then redirect to shipping)
  const checkoutDestination = userInfo ? '/shipping' : '/login?redirect=/shipping';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. Backdrop (Click to close) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* 2. The Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p>Your cart is empty.</p>
                  <button onClick={closeCart} className="text-accent font-bold hover:underline">Start Shopping</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.sku} className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.sku))}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      {/* Safety Check: added || {} to prevent crash if selectedOptions is undefined */}
                      <p className="text-xs text-gray-500 mb-2">
                         {Object.values(item.selectedOptions || {}).join(' / ')}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-gray-500">Qty: {item.qty}</span>
                        <span className="font-bold text-primary">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-2xl font-bold text-primary">${itemsPrice}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout.</p>
                
                <Link 
                  to={checkoutDestination}
                  onClick={closeCart}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                  Checkout Now <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;