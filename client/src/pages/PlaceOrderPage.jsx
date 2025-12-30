import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';
import { clearCart } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/shared/CheckoutSteps';
import { Loader2, ArrowRight, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { addDecimals } from '../utils/cartUtils'; // Ensure you have this from previous steps

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
      
      dispatch(clearCart());
      // We haven't built the Order Success/Detail page yet, so for now we redirect to home
      // In the next step, we will change this to: navigate(`/order/${res._id}`);
      navigate(`/order/${res._id}`);
      alert('Order Placed Successfully!');
    } catch (err) {
      console.error('error: ', err);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4">
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Order Details */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                <MapPin className="text-accent" /> Shipping To
             </h2>
             <p className="text-gray-600">
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
             </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                <CreditCard className="text-accent" /> Payment Method
             </h2>
             <p className="text-gray-600">
                Method: <span className="font-bold">{cart.paymentMethod}</span>
             </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                <ShoppingBag className="text-accent" /> Order Items
             </h2>
             {cart.cartItems.length === 0 ? (
                <div className="text-gray-500">Your cart is empty</div>
             ) : (
                <div className="space-y-4">
                   {cart.cartItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                         <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1">
                            <Link to={`/product/${item.product}`} className="font-bold text-gray-800 hover:text-accent transition-colors line-clamp-1">
                               {item.name}
                            </Link>
                            <p className="text-xs text-gray-500">
                               {Object.values(item.selectedOptions || {}).join(' / ')}
                            </p>
                         </div>
                         <div className="text-sm font-medium text-gray-600">
                            {item.qty} x ${item.price} = <span className="font-bold text-primary">${(item.qty * item.price).toFixed(2)}</span>
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="md:col-span-1">
           <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-primary">Order Summary</h2>
              
              <div className="space-y-3 text-sm border-b border-gray-100 pb-6 mb-6">
                 <div className="flex justify-between">
                    <span className="text-gray-500">Items</span>
                    <span className="font-bold">${cart.itemsPrice}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold">${cart.shippingPrice}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-bold">${cart.taxPrice}</span>
                 </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-primary mb-8">
                 <span>Total</span>
                 <span>${cart.totalPrice}</span>
              </div>

              {error && (
                 <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-xs">
                    {error?.data?.message || 'Error placing order'}
                 </div>
              )}

              <button 
                 type="button"
                 className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
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