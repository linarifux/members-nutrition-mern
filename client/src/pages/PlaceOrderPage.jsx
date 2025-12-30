import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';
import { clearCartItems } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/shared/CheckoutSteps';
import { Loader2, ArrowRight, ShoppingBag, MapPin, CreditCard } from 'lucide-react';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error('error: ', err);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <CheckoutSteps step1 step2 step3 step4 />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mt-10">
        
        {/* LEFT COLUMN: Order Details */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Shipping Info */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                <MapPin className="text-accent" /> Shipping To
             </h2>
             <p className="text-gray-300 leading-relaxed">
                <span className="block font-bold text-lg text-white mb-1">{cart.shippingAddress.address}</span>
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}<br/>
                {cart.shippingAddress.country}
             </p>
          </div>

          {/* Payment Info */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                <CreditCard className="text-accent" /> Payment Method
             </h2>
             <p className="text-gray-300">
                Method: <span className="font-bold text-white">{cart.paymentMethod}</span>
             </p>
          </div>

          {/* Order Items */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
                <ShoppingBag className="text-accent" /> Order Items
             </h2>
             {cart.cartItems.length === 0 ? (
                <div className="text-gray-500 text-center py-4">Your cart is empty</div>
             ) : (
                <div className="space-y-4">
                   {cart.cartItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="w-20 h-20 bg-black/20 rounded-lg overflow-hidden shrink-0 border border-white/5">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                             <Link to={`/product/${item.product}`} className="font-bold text-white hover:text-accent transition-colors line-clamp-1 text-lg">
                                {item.name}
                             </Link>
                             <p className="text-sm text-gray-500 mt-1">
                                {Object.values(item.selectedOptions || {}).join(' / ')}
                             </p>
                          </div>
                          <div className="text-right">
                             <div className="text-sm text-gray-400 mb-1">{item.qty} x ${item.price}</div>
                             <div className="font-bold text-accent text-lg">${(item.qty * item.price).toFixed(2)}</div>
                          </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="md:col-span-1">
           <div className="glass-panel p-8 rounded-3xl border border-white/10 sticky top-24 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
              
              <div className="space-y-4 text-sm border-b border-white/10 pb-6 mb-6">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-400">Items</span>
                    <span className="font-bold text-white text-lg">${cart.itemsPrice}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-bold text-white text-lg">${cart.shippingPrice}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tax</span>
                    <span className="font-bold text-white text-lg">${cart.taxPrice}</span>
                 </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-accent mb-8">
                 <span>Total</span>
                 <span>${cart.totalPrice}</span>
              </div>

              {error && (
                 <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-sm border border-red-500/20">
                    {error?.data?.message || 'Error placing order'}
                 </div>
              )}

              <button 
                 type="button"
                 className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                 disabled={cart.cartItems.length === 0 || isLoading}
                 onClick={placeOrderHandler}
              >
                 {isLoading ? <Loader2 className="animate-spin" /> : 'Place Order'}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderPage;