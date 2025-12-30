import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/shared/CheckoutSteps';
import { ArrowRight, CreditCard, Wallet } from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen pt-10 pb-20 px-4">
      
      <CheckoutSteps step1 step2 step3 />

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-primary p-8 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
           <h1 className="text-2xl font-bold relative z-10 flex items-center gap-2">
              <CreditCard className="text-accent" /> Payment Method
           </h1>
           <p className="text-primary-foreground/60 text-sm mt-2 relative z-10 opacity-80">
              Select how you want to pay.
           </p>
        </div>

        <div className="p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            
            <div className="space-y-4">
               {/* Option 1: PayPal / Credit Card */}
               <label 
                 className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                   paymentMethod === 'PayPal' 
                     ? 'border-accent bg-accent/5' 
                     : 'border-gray-100 hover:border-gray-200'
                 }`}
               >
                 <input 
                   type="radio" 
                   name="paymentMethod" 
                   value="PayPal" 
                   checked={paymentMethod === 'PayPal'}
                   onChange={(e) => setPaymentMethod(e.target.value)}
                   className="accent-accent w-5 h-5"
                 />
                 <div className="flex-1">
                    <span className="font-bold text-gray-800 block">PayPal or Credit Card</span>
                    <span className="text-xs text-gray-500">Safe, secure payment via PayPal.</span>
                 </div>
                 <Wallet className="text-blue-600" size={24} />
               </label>

               {/* Option 2: Stripe (Placeholder for future) */}
               {/* <label className="...">
                 ...
               </label> 
               */}
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-primary/20"
            >
              Continue to Review <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;