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
    <div className="min-h-screen pt-10 pb-20 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -z-10" />
      
      <CheckoutSteps step1 step2 step3 />

      <div className="max-w-xl mx-auto glass-panel rounded-3xl shadow-2xl overflow-hidden border border-white/10 mt-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-accent/20 to-orange-600/10 p-8 text-white relative overflow-hidden border-b border-white/5">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
           <h1 className="text-2xl font-bold relative z-10 flex items-center gap-2">
              <CreditCard className="text-accent" /> Payment Method
           </h1>
           <p className="text-gray-300 text-sm mt-2 relative z-10 opacity-80">
              Select how you want to pay.
           </p>
        </div>

        <div className="p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            
            <div className="space-y-4">
               {/* Option 1: PayPal / Credit Card */}
               <label 
                 className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                   paymentMethod === 'PayPal' 
                     ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                     : 'border-white/10 hover:bg-white/5 hover:border-white/20'
                 }`}
               >
                 <div className="relative flex items-center justify-center">
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="PayPal" 
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:border-accent checked:border-4 transition-all"
                    />
                 </div>

                 <div className="flex-1">
                    <span className="font-bold text-white block">PayPal or Credit Card</span>
                    <span className="text-xs text-gray-400">Safe, secure payment via PayPal.</span>
                 </div>
                 <Wallet className="text-blue-400" size={24} />
               </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-accent/20 btn-glow"
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