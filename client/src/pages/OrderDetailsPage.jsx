import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../redux/slices/ordersApiSlice';
import { Loader2, MapPin, CreditCard, ShoppingBag, AlertCircle, CheckCircle, Truck } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  // Queries
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
  
  // PayPal Script Reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  // Load PayPal Script when Client ID is ready
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  // Handle Payment Success
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment Successful!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    });
  };

  // Handle Mark As Delivered
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48}/></div>;
  if (error) return <div className="text-center py-20 text-red-400">Error: {error?.data?.message || error.error}</div>;

  return (
    <div className="min-h-screen pt-10 pb-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
         <h1 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            Order ID: <span className="font-mono text-accent">{order._id}</span>
         </h1>
         
         <div className="grid md:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: Details */}
           <div className="md:col-span-2 space-y-8">
               
               {/* Shipping Info */}
               <div className="glass-panel p-8 rounded-3xl border border-white/10">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                     <MapPin className="text-accent" /> Shipping To
                  </h2>
                  <div className="text-gray-300 mb-6 space-y-1">
                     <p><strong className="text-white">Name:</strong> {order.user.name}</p>
                     <p><strong className="text-white">Email:</strong> <a href={`mailto:${order.user.email}`} className="hover:text-accent">{order.user.email}</a></p>
                     <p><strong className="text-white">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                  </div>
                  
                  {order.isDelivered ? (
                     <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm">
                        <CheckCircle size={18} /> Delivered on {order.deliveredAt?.substring(0, 10)}
                     </div>
                  ) : (
                     <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm">
                        <AlertCircle size={18} /> Not Delivered
                     </div>
                  )}
               </div>

               {/* Payment Info */}
               <div className="glass-panel p-8 rounded-3xl border border-white/10">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                     <CreditCard className="text-accent" /> Payment Status
                  </h2>
                  <p className="text-gray-300 mb-6">
                     <strong className="text-white">Method:</strong> {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                     <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm">
                        <CheckCircle size={18} /> Paid on {order.paidAt?.substring(0, 10)}
                     </div>
                  ) : (
                     <div className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-sm">
                        <AlertCircle size={18} /> Not Paid
                     </div>
                  )}
               </div>

               {/* Order Items */}
               <div className="glass-panel p-8 rounded-3xl border border-white/10">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
                     <ShoppingBag className="text-accent" /> Order Items
                  </h2>
                  <div className="space-y-4">
                     {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                           <div className="w-16 h-16 bg-black/20 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <Link to={`/product/${item.product}`} className="font-bold text-white hover:text-accent transition-colors line-clamp-1">
                                 {item.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">
                                 {Object.values(item.selectedOptions || {}).join(' / ')}
                              </p>
                           </div>
                           <div className="text-sm font-medium text-gray-400">
                              {item.qty} x ${item.price} = <span className="font-bold text-accent">${(item.qty * item.price).toFixed(2)}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
           </div>

           {/* RIGHT COLUMN: Summary & Actions */}
           <div className="md:col-span-1">
              <div className="glass-panel p-8 rounded-3xl border border-white/10 sticky top-24 shadow-2xl">
                 <h2 className="text-xl font-bold mb-6 text-white">Order Summary</h2>
                 
                 <div className="space-y-3 text-sm border-b border-white/10 pb-6 mb-6">
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400">Items</span>
                       <span className="font-bold text-white">${order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400">Shipping</span>
                       <span className="font-bold text-white">${order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-400">Tax</span>
                       <span className="font-bold text-white">${order.taxPrice}</span>
                    </div>
                 </div>

                 <div className="flex justify-between text-lg font-bold text-accent mb-8">
                    <span>Total</span>
                    <span>${order.totalPrice}</span>
                 </div>

                 {/* PayPal Button (If not paid) */}
                 {!order.isPaid && (
                    <div className="mb-4">
                       {loadingPay && <Loader2 className="animate-spin mb-2 mx-auto text-accent" />}
                       {isPending ? <Loader2 className="animate-spin mx-auto text-white" /> : (
                           <PayPalButtons 
                               createOrder={createOrder}
                               onApprove={onApprove}
                               onError={onError}
                               style={{ layout: "vertical", shape: "rect", color: "gold" }}
                           />
                       )}
                    </div>
                 )}

                 {/* Admin: Mark as Delivered */}
                 {userInfo && userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
                    <button 
                       onClick={deliverHandler}
                       disabled={loadingDeliver}
                       className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                       {loadingDeliver ? <Loader2 className="animate-spin" /> : <><Truck size={18} /> Mark as Delivered</>}
                    </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;