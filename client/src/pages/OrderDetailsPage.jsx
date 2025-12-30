import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from '../redux/slices/ordersApiSlice';
import { Loader2, MapPin, CreditCard, ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  // Queries
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
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
        await payOrder({ orderId, details });
        refetch(); // Reload data to show "Paid" badge
        alert('Payment Successful!');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    });
  };

  const onError = (err) => {
    alert(err.message);
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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48}/></div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error?.data?.message || error.error}</div>;

  return (
    <div className="min-h-screen pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
         <h1 className="text-2xl font-bold mb-6 text-primary">Order ID: {order._id}</h1>
         
         <div className="grid md:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Details */}
            <div className="md:col-span-2 space-y-8">
               
               {/* Shipping Info */}
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                     <MapPin className="text-accent" /> Shipping To
                  </h2>
                  <p className="text-gray-600 mb-4">
                     <strong className="text-primary">Name:</strong> {order.user.name} <br/>
                     <strong className="text-primary">Email:</strong> {order.user.email} <br/>
                     <strong className="text-primary">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                  
                  {order.isDelivered ? (
                     <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
                        <CheckCircle size={16} /> Delivered on {order.deliveredAt?.substring(0, 10)}
                     </div>
                  ) : (
                     <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
                        <AlertCircle size={16} /> Not Delivered
                     </div>
                  )}
               </div>

               {/* Payment Info */}
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                     <CreditCard className="text-accent" /> Payment Status
                  </h2>
                  <p className="text-gray-600 mb-4">
                     <strong className="text-primary">Method:</strong> {order.paymentMethod}
                  </p>

                  {order.isPaid ? (
                     <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
                        <CheckCircle size={16} /> Paid on {order.paidAt?.substring(0, 10)}
                     </div>
                  ) : (
                     <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
                        <AlertCircle size={16} /> Not Paid
                     </div>
                  )}
               </div>

               {/* Order Items */}
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-primary">
                     <ShoppingBag className="text-accent" /> Order Items
                  </h2>
                  <div className="space-y-4">
                     {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                           <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
               </div>
            </div>

            {/* RIGHT COLUMN: Summary & Payment Button */}
            <div className="md:col-span-1">
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-bold mb-6 text-primary">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm border-b border-gray-100 pb-6 mb-6">
                     <div className="flex justify-between">
                        <span className="text-gray-500">Items</span>
                        <span className="font-bold">${order.itemsPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-bold">${order.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span className="font-bold">${order.taxPrice}</span>
                     </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-primary mb-8">
                     <span>Total</span>
                     <span>${order.totalPrice}</span>
                  </div>

                  {!order.isPaid && (
                     <div>
                        {loadingPay && <Loader2 className="animate-spin mb-2" />}
                        {isPending ? <Loader2 className="animate-spin" /> : (
                            <PayPalButtons 
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                            />
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
